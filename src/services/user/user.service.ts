import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ObjectId } from "mongodb";
import { UserIsAlreadyBlockedException } from "src/common/exceptions/user/user-is-already-blocked.exception";
import { UserNotFoundException } from "src/common/exceptions/user/user-not-found.exception";
import { UserResponseDTO } from "src/dto/user/user-response.dto";
import { UserEntity } from "src/infrastructure/db/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserList(): Promise<UserResponseDTO[]> {
    const result: UserResponseDTO[] = await this.userRepository.find({
      select: [
        "_id",
        "username",
        "email",
        "createdAt",
        "updatedAt",
        "notifications",
        "roles",
      ],
      where: { blocked: false },
    });

    return result;
  }

  async getUserById(userId: string): Promise<UserResponseDTO> {
    const result: UserResponseDTO = await this.userRepository.findOne({
      where: { _id: new ObjectId(userId) },
      select: ["username", "createdAt", "email", "_id"],
    });

    if (!result) {
      throw new UserNotFoundException();
    }

    return result;
  }

  async blockUserById(userId: string): Promise<void> {
    await this.getUserById(userId);
    await this.isUserBlocked(userId);

    await this.userRepository.update(
      { _id: new ObjectId(userId) },
      { blocked: true },
    );
  }

  async getUserDetailsById(userId: string): Promise<UserResponseDTO> {
    const result: UserResponseDTO = await this.userRepository.findOne({
      where: { _id: new ObjectId(userId) },
    });

    if (!result) {
      throw new UserNotFoundException();
    }

    return result;
  }

  async isUserBlocked(userId: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: { _id: new ObjectId(userId) },
    });

    if (user.blocked) {
      throw new UserIsAlreadyBlockedException();
    }

    return false;
  }
}
