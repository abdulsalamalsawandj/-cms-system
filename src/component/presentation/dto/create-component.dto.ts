import { IsString, MinLength, IsObject } from 'class-validator';

export class createComponentDto {
    @IsString()
    @MinLength(1)
    nameEn : string;

    @IsString()
    @MinLength(1)
    nameAr : string;

    @IsObject()
    properties : Record<string, any>;
}
