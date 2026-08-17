import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { pageComponentEntity } from "src/component/domain/entities/pageComponent.entity";
import type { PageComponentRepository } from "src/component/domain/repositories/pageComponent.repository.interface";

@Injectable()
export class AttachComponentToSectionUseCase {
    constructor(@Inject('PageComponentRepository') private PageComponentRep : PageComponentRepository){}

    async execute (input : {
        sectionId : number;
        componentId : number;
        data : Record<string, any>;
        componentSettings? : Record<string, any>;
        index? : number;
        parentId? : number | null;
        createdById : number;
    }) : Promise<pageComponentEntity> {
        if (!input.sectionId || !input.componentId){
            throw new BadRequestException('Section and component are required');
        }

        return this.PageComponentRep.create({
            sectionId: input.sectionId,
            componentId: input.componentId,
            data: input.data,
            componentSettings: input.componentSettings ?? {},
            index: input.index ?? 0,
            parentId: input.parentId ?? null,
            createdById: input.createdById,
        });
    }
}
