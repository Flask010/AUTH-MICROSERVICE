import { ConflictException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RegisterRequestDTO } from "src/dto/auth/register-request.dto";
import { UserEntity } from "src/infrastructure/db/entities/user.entity";
import { UserRoles } from "src/enums/roles/roles.enum";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { TokenService } from "../token/token.service";
import { LoginRequestDTO } from "src/dto/auth/login-request.dto";
import { UserNotFoundException } from "src/common/exceptions/user/user-not-found.exception";
import { UserDTO } from "src/dto/user/user.dto";
import { InvalidPasswordException } from "src/common/exceptions/auth/invalid-password.exception";
import { UserResponseDTO } from "src/dto/user/user-response.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly tokenService: TokenService,
  ) {}

  async register(model: RegisterRequestDTO): Promise<UserResponseDTO> {
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

    const userShortResponse: UserResponseDTO = {
      id: savedUser.id,
      username: savedUser.username,
      email: savedUser.email,
      notifications: false,
      createdAt: savedUser.createdAt,
      roles: savedUser.roles,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    return userShortResponse;
  }

  async login(model: LoginRequestDTO): Promise<UserResponseDTO> {
    const user: UserDTO = await this.userRepository.findOne({
      where: { email: model.email },
    });

    if (!user) {
      throw new UserNotFoundException();
    }
    if (!(await bcrypt.compare(model.password, user.password))) {
      throw new InvalidPasswordException();
    }

    const accessToken = this.tokenService.createAccessToken({
      userId: user.id,
    });
    const refreshToken = await this.tokenService.createRefreshToken({
      email: model.email,
    });

    const userShortResponse: UserResponseDTO = {
      username: user.username,
      email: user.email,
      accessToken: accessToken,
      refreshToken: refreshToken,
    };

    return userShortResponse;
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
