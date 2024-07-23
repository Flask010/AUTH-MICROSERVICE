import {
  Controller,
  Get,
  Param,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { UserResponseDTO } from "src/dto/user/user-response.dto";
import { UserRoutes } from "src/enums/routes/user-routes.enum";
import { UserService } from "src/services/user/user.service";

@Controller(UserRoutes.BasePrefix)
@UsePipes(new ValidationPipe())
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(UserRoutes.List)
  async getUserList(): Promise<UserResponseDTO[]> {
    const result: UserResponseDTO[] = await this.userService.getUserList();
    return result;
  }

  @Put(UserRoutes.BlockById)
  async blockUserById(@Param("userId") userId: string): Promise<void> {
    await this.userService.blockUserById(userId);
  }

  @Get(UserRoutes.GetById)
  async getUserById(@Param("userId") userId: string): Promise<UserResponseDTO> {
    const result: UserResponseDTO = await this.userService.getUserById(userId);
    return result;
  }

  @Get(UserRoutes.GetDetailsById)
  async getUserDetailsById(
    @Param("userId") userId: string,
  ): Promise<UserResponseDTO> {
    const result: UserResponseDTO =
      await this.userService.getUserDetailsById(userId);
    return result;
  }
}
