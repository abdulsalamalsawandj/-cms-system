import { IsString, MinLength, IsInt } from 'class-validator';

export class createSectionDto {
    @IsString()
    @MinLength(1)
    nameEn : string;

    @IsString()
    @MinLength(1)
    nameAr : string;

    @IsInt()
    pageId : number;
}
