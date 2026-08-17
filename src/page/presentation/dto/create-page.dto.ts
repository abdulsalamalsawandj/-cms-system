import {IsString, MinLength} from 'class-validator';

export class craetePageDto {
    @IsString()
    @MinLength(1)
    nameEn : string;

    @IsString()
    @MinLength(1)
    nameAr : string;
}