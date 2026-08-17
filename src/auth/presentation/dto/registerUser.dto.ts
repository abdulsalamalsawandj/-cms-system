import { IsString, isEmail, MinLength, IsEAN, IsEmail, isString } from "class-validator";

export class registerDto {
    @IsString()
    @MinLength(1)
    name : string;

    @IsEmail()
    email : string

    @IsString()
    @MinLength(8)
    password : string;
}
