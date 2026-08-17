import { Inject, Injectable } from "@nestjs/common";
import { pageComponentEntity } from "src/component/domain/entities/pageComponent.entity";
import type { PageComponentRepository } from "src/component/domain/repositories/pageComponent.repository.interface";

@Injectable()
export class FindComponentsBySectionIdUseCase {
    constructor(@Inject('PageComponentRepository') private PageComponentRep : PageComponentRepository){}

    async execute (sectionId : number) : Promise<pageComponentEntity[]> {
        return this.PageComponentRep.findBySectionId(sectionId);
    }
}
