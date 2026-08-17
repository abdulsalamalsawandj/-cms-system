import { IsString, MinLength } from 'class-validator';

export class replyContactMessageDto {
    @IsString()
    @MinLength(1)
    adminReply : string;
}
