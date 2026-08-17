import { Injectable, Param, Get, Body, Post, Patch, Delete, Controller, } from "@nestjs/common";
import { registerUserUseCase } from "src/auth/application/use_cases/register.Use_cae";
import { loginUseCase } from "src/auth/application/use_cases/login.use_case";
import { logInDto } from "./dto/logIn.dto";
import { registerDto } from "./dto/registerUser.dto";
import { refreshTokenUseCase } from "src/auth/application/use_cases/refresh-token.use_case";

@Controller('auth')
export class authController {
    constructor(
        private readonly registerUserUseCase : registerUserUseCase,
        private readonly loginUseCase : loginUseCase,
        private readonly refreshTokenUseCase : refreshTokenUseCase,
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
        
}