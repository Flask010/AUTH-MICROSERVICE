import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { RegisterRequestDTO } from "src/dto/auth/register-request.dto";
import { UserShortDTO } from "src/dto/auth/user-short.dto";
import { AuthService } from "src/services/auth/auth.service";

@Controller("auth")
@UsePipes(new ValidationPipe())
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  async register(@Body() model: RegisterRequestDTO): Promise<UserShortDTO> {
    const result: UserShortDTO = await this.authService.register(model);
    return result;
  }
}
