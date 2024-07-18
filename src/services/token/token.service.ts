import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { RefreshTokenModelDTO } from "src/dto/token/refresh-token-model.dto";
import { TokenModelDTO } from "src/dto/token/token-model.dto";
import { AppConfig } from "src/infrastructure/app-config/app-config";

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly appConfig: AppConfig,
  ) {}

  createAccessToken(model: TokenModelDTO): string {
    const accessToken: string = this.jwtService.sign(
      Object.assign({}, { userId: model.userId }),
      {
        secret: this.appConfig.API_JWT_ACCESS_TOKEN_SECRET,
        expiresIn: this.appConfig.API_JWT_ACCESS_TOKEN_EXPIRATION,
      },
    );

    return accessToken;
  }

  async createRefreshToken(model: RefreshTokenModelDTO): Promise<string> {
    const refreshToken: string = this.jwtService.sign(
      Object.assign({}, { email: model.email }),
      {
        secret: this.appConfig.API_JWT_REFRESH_TOKEN_SECRET,
        expiresIn: this.appConfig.API_JWT_REFRESH_TOKEN_EXPIRATION,
      },
    );

    return refreshToken;
  }

  async decodeAccessToken(accessToken: string): Promise<TokenModelDTO | null> {
    try {
      return await this.jwtService.verifyAsync<TokenModelDTO>(accessToken, {
        secret: this.appConfig.API_JWT_ACCESS_TOKEN_SECRET,
      });
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async decodeRefreshToken(
    refreshToken: string,
  ): Promise<RefreshTokenModelDTO | null> {
    try {
      return await this.jwtService.verifyAsync<RefreshTokenModelDTO>(
        refreshToken,
        {
          secret: this.appConfig.API_JWT_REFRESH_TOKEN_SECRET,
        },
      );
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
