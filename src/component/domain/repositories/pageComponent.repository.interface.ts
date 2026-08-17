import type { pageComponentEntity } from "../entities/pageComponent.entity";

export interface PageComponentRepository {
    findById(id : number): Promise<pageComponentEntity | null>;
    findBySectionId(sectionId : number) : Promise <pageComponentEntity[]>
    create (input : {
        sectionId : number;
        componentId : number;
        data : Record<string, any>;
        componentSettings : Record<string, any>;
        index : number;
        parentId : number | null;
        createdById : number;
    }) : Promise <pageComponentEntity>;
    update(id : number, data: Partial<{data: Record<string, any>; componentSettings: Record<string, any>; index: number; parentId: number | null}>) : Promise <pageComponentEntity>;
    delete(id : number) : Promise <void>;


}
