import { Inject, Injectable } from "@nestjs/common";
import { sectionEntity } from "src/section/domain/entities/section.entity";
import type { SectionRepository } from "src/section/domain/repositories/section.repository.interface";

@Injectable()
export class FindSectionsByPageIdUseCase {
    constructor(@Inject('SectionRepository') private SectionRep : SectionRepository){}

    async execute (pageId : number) : Promise<sectionEntity[]> {
        return this.SectionRep.findByPageId(pageId);
    }
}
