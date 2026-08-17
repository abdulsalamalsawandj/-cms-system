import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { registerUserUseCase } from "src/auth/application/use_cases/register.Use_cae";
import { loginUseCase } from "../application/use_cases/login.use_case";
import { authController } from "./auth.controller";
import { PrismaUserRepository } from "../infrastructure/repositories/prismaUser.repositories";
import { PrismaRefreshTokenRepository } from "../infrastructure/repositories/prismaRefreshToken.repositories"
import { refreshTokenUseCase } from "src/auth/application/use_cases/refresh-token.use_case";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [authController],
  providers: [
    registerUserUseCase,
    refreshTokenUseCase,
    loginUseCase,
    { provide: 'userRepository', useClass: PrismaUserRepository },
    { provide: 'refreshTokenRepository', useClass: PrismaRefreshTokenRepository },
  ],
})
export class authModule {}