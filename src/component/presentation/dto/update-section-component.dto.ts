import { IsInt, IsObject, IsOptional } from 'class-validator';

export class updateSectionComponentDto {
    @IsOptional()
    @IsObject()
    data? : Record<string, any>;

    @IsOptional()
    @IsObject()
    componentSettings? : Record<string, any>;

    @IsOptional()
    @IsInt()
    index? : number;

    @IsOptional()
    @IsInt()
    parentId? : number | null;
}
