import type { componentEntity } from "../entities/component.entity";

export interface ComponentRepository {
    findById(id : number): Promise<componentEntity | null>;
    create (data : {
        nameEn : string;
        nameAr: string;
        properties : Record<string, any>;
        createdById : number;
    }) : Promise <componentEntity>;
}
