import { IsString, MinLength, IsInt, IsOptional } from 'class-validator';

export class updateSectionDto {
    @IsOptional()
    @IsString()
    @MinLength(1)
    nameEn? : string;

    @IsOptional()
    @IsString()
    @MinLength(1)
    nameAr? : string;

    @IsOptional()
    @IsInt()
    index? : number;
}
