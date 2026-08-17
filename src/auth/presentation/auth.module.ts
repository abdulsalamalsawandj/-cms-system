import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { registerUserUseCase } from "src/auth/application/use_cases/register.Use_cae";
import { loginUseCase } from "../application/use_cases/login.use_case";
import { authController } from "./auth.controller";
import { PrismaUserRepository } from "../infrastructure/repositories/prismaUser.repositories";
import { PrismaRefreshTokenRepository } from "../infrastructure/repositories/prismaRefreshToken.repositories"
import { refreshTokenUseCase } from "src/auth/application/use_cases/refresh-token.use_case";
import { getProfileUseCase } from "src/auth/application/use_cases/get-profile.use_case";
import { updateProfileUseCase } from "src/auth/application/use_cases/update-profile.use_case";

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
    getProfileUseCase,
    updateProfileUseCase,
    { provide: 'userRepository', useClass: PrismaUserRepository },
    { provide: 'refreshTokenRepository', useClass: PrismaRefreshTokenRepository },
  ],
})
export class authModule {}