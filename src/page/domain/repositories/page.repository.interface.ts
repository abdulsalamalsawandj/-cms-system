import type { pageEntity } from "../entities/page.entity";

export interface PageRepository { 
    findById(id : number): Promise<pageEntity | null>;
    findAll() : Promise <pageEntity[]>
    create (data : {
        nameEn : string;
        nameAr: string;
        createdById : number;
    }) : Promise <pageEntity>;
    update(id : number, data: Partial<{nameEn: string; nameAr : string; index: number}>) : Promise <pageEntity>;
    publish(id : number) : Promise <void>;
    delete(id : number) : Promise <void>;


} 