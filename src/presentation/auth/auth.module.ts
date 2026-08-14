import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { registerUserUseCase } from "src/application/use_cases/auth/register.Use_cae";
import { loginUseCase } from "../../application/use_cases/auth/login.use_case";
import { authController } from "./auth.controller";
import { PrismaUserRepository } from "../../infrastructure/repositories/prismaUser.repositories";
import { PrismaRefreshTokenRepository } from "../../infrastructure/repositories/prismaRefreshToken.repositories";

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [authController],
  providers: [
    registerUserUseCase,
    loginUseCase,
    { provide: 'userRepository', useClass: PrismaUserRepository },
    { provide: 'refreshTokenRepository', useClass: PrismaRefreshTokenRepository },
  ],
})
export class authModule {}