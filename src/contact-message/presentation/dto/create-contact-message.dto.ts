import { IsString, MinLength } from 'class-validator';

export class createContactMessageDto {
    @IsString()
    @MinLength(1)
    message : string;
}
