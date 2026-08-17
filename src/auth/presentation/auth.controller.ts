import { Injectable, Param, Get, Body, Post, Patch, Delete, Controller, UseGuards, Req } from "@nestjs/common";
import type { Request } from "express";
import { registerUserUseCase } from "src/auth/application/use_cases/register.Use_cae";
import { loginUseCase } from "src/auth/application/use_cases/login.use_case";
import { logInDto } from "./dto/logIn.dto";
import { registerDto } from "./dto/registerUser.dto";
import { refreshTokenUseCase } from "src/auth/application/use_cases/refresh-token.use_case";
import { getProfileUseCase } from "src/auth/application/use_cases/get-profile.use_case";
import { updateProfileUseCase } from "src/auth/application/use_cases/update-profile.use_case";
import { updateProfileDto } from "./dto/updateProfile.dto";
import { AuthGuard } from "src/auth/presentation/guards/authGuard";
import { Role } from "generated/prisma/enums";

interface AuthenticatedRequest extends Request {
    user: { sub: number; role: Role };
}

@Controller('auth')
export class authController {
    constructor(
        private readonly registerUserUseCase : registerUserUseCase,
        private readonly loginUseCase : loginUseCase,
        private readonly refreshTokenUseCase : refreshTokenUseCase,
        private readonly getProfileUseCase : getProfileUseCase,
        private readonly updateProfileUseCase : updateProfileUseCase,
    ){}

    @Post('register')
    register(@Body() dto : registerDto){
        return this.registerUserUseCase.execute(dto);
    }


    @Post('login')
    login (@Body() dto : logInDto){
        return this.loginUseCase.execute(dto);
    }

    @Post('refresh')
    refresh(@Body() dto: {refreshToken: string}){
        return this.refreshTokenUseCase.execute(dto.refreshToken)
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile (@Req() req : AuthenticatedRequest){
        return this.getProfileUseCase.execute(req.user.sub);
    }

    @UseGuards(AuthGuard)
    @Patch('profile')
    updateProfile (@Body() dto : updateProfileDto, @Req() req : AuthenticatedRequest){
        return this.updateProfileUseCase.execute(req.user.sub, dto);
    }

}