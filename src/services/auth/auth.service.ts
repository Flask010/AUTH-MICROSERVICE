import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterRequestDTO } from "src/dto/auth/register-request.dto";
import { UserShortDTO } from "src/dto/auth/user-short.dto";
import { UserEntity } from "src/infrastructure/db/entities/user.entity";
import { UserRoles } from "src/infrastructure/db/enums/roles.enum";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { TokenService } from "../token/token.service";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly tokenService: TokenService,
  ) {}

  async register(model: RegisterRequestDTO): Promise<UserShortDTO> {
    await this.checkUserForUnique(model.username, model.email);
    const refreshToken = await this.tokenService.createRefreshToken({
      email: model.email,
    });

    const newUser = this.userRepository.create({
      username: model.username,
      email: model.email,
      refreshToken,
      password: await this.hashPassword(model.password),
      roles: [UserRoles.User],
    });

    const savedUser = await this.userRepository.save(newUser);
    const accessToken = this.tokenService.createAccessToken({
      userId: savedUser.id,
    });

    const userShort: UserShortDTO = {
      id: savedUser.id,
      username: savedUser.username,
      email: savedUser.email,
      notifications: false,
      createdAt: savedUser.createdAt,
      roles: savedUser.roles,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    return userShort;
  }

  async checkUserForUnique(username: string, email: string) {
    const userExists = await this.userRepository.findOne({
      where: {
        $or: [{ username }, { email }],
      } as any,
    });

    if (userExists && userExists?.email === email) {
      throw new ConflictException(`This email: ${email} is already taken`);
    } else if (userExists && userExists?.username === username) {
      throw new ConflictException(
        `This username: ${username} is already taken`,
      );
    }
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }
}
