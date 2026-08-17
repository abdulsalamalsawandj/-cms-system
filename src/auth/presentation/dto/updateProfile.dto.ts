import { IsString, IsEmail, MinLength, IsOptional } from "class-validator";

export class updateProfileDto {
    @IsOptional()
    @IsString()
    @MinLength(1)
    name? : string;

    @IsOptional()
    @IsEmail()
    email? : string;

    @IsOptional()
    @IsString()
    @MinLength(8)
    password? : string;
}
