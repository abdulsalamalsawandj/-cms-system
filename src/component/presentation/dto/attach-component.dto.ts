import { IsInt, IsObject, IsOptional } from 'class-validator';

export class attachComponentDto {
    @IsInt()
    componentId : number;

    @IsObject()
    data : Record<string, any>;

    @IsOptional()
    @IsObject()
    componentSettings? : Record<string, any>;

    @IsOptional()
    @IsInt()
    index? : number;

    @IsOptional()
    @IsInt()
    parentId? : number;
}
