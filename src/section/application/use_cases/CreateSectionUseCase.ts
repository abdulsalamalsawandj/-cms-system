import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { sectionEntity } from "src/section/domain/entities/section.entity";
import type { SectionRepository } from "src/section/domain/repositories/section.repository.interface";

@Injectable()
export class CreateSectionUseCase {
    constructor(@Inject('SectionRepository') private SectionRep : SectionRepository){}

    async execute (input : {
        nameEn : string;
        nameAr : string;
        createdById : number,
        pageId : number,
    }) : Promise<sectionEntity> {
        if (!input.nameEn.trim() || !input.nameAr.trim()){
            throw new BadRequestException('Arabic or English name or both of them are missed');
        }
        return this.SectionRep.create(input);
    }
}

