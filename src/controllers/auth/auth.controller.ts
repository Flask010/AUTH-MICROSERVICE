import {
  Body,
  Controller,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { LoginRequestDTO } from "src/dto/auth/login-request.dto";
import { RefreshTokenDTO } from "src/dto/auth/refresh-token.dto";
import { RegisterRequestDTO } from "src/dto/auth/register-request.dto";
import { UserResponseDTO } from "src/dto/user/user-response.dto";
import { AuthRoutes } from "src/enums/routes/auth-routes.enum";
import { AuthService } from "src/services/auth/auth.service";

@Controller(AuthRoutes.BasePrefix)
@UsePipes(new ValidationPipe())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post(AuthRoutes.Register)
  async register(@Body() model: RegisterRequestDTO): Promise<UserResponseDTO> {
    const result: UserResponseDTO = await this.authService.register(model);
    return result;
  }

  @Post(AuthRoutes.Login)
  async login(@Body() model: LoginRequestDTO): Promise<UserResponseDTO> {
    const result: UserResponseDTO = await this.authService.login(model);
    return result;
  }

  @Put(AuthRoutes.RefreshToken)
  async refreshToken(@Body() model: RefreshTokenDTO): Promise<UserResponseDTO> {
    const result: UserResponseDTO = await this.authService.refreshToken(model);
    return result;
  }
}
