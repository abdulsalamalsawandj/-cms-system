import type { sectionEntity } from "../entities/section.entity";

export interface SectionRepository {
    findById(id : number): Promise<sectionEntity | null>;
    findByPageId(pageId : number) : Promise <sectionEntity[]>
    create (data : {
        nameEn : string;
        nameAr: string;
        pageId : number;
        createdById : number;
    }) : Promise <sectionEntity>;
    update(id : number, data: Partial<{nameEn: string; nameAr : string; index: number}>) : Promise <sectionEntity>;
    delete(id : number) : Promise <void>;


}
