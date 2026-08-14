import { IsString, IsEmail, MinLength, isString } from "class-validator";

export class logInDto {
    @IsString()
    @MinLength(1)
    name : string;

    @IsEmail()
    email : string;

    @IsString()
    @MinLength(8)

    password : string;
}
