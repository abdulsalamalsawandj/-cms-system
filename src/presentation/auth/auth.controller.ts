import { Injectable, Param, Get, Body, Post, Patch, Delete, Controller, } from "@nestjs/common";
import { registerUserUseCase } from "src/application/use_cases/auth/register.Use_cae";
import { loginUseCase } from "src/application/use_cases/auth/login.use_case";
import { logInDto } from "./dto/logIn.dto";
import { registerDto } from "./dto/registerUser.dto";

@Controller('auth')
export class authController {
    constructor(
        private readonly registerUserUseCase : registerUserUseCase,
        private readonly loginUseCase : loginUseCase
    ){}

    @Post('register')
    register(@Body() dto : registerDto){
        return this.registerUserUseCase.execute(dto);
    }
        

    @Post('login') 
    login (@Body() dto : logInDto){
        return this.loginUseCase.execute(dto);
    }
        
}