import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import type { PageRepository } from "src/domain/repositories/page.repository.interface";
import type { pageEntity } from "src/domain/entities/page.entity";

@Injectable()
export class createPageUseCase { 
    constructor(
    @Inject('PageRepository') private pageRep : PageRepository,
    ){}

    async execute(input: {
        nameEn: string;
        nameAr: string; 
        createdById : number;
    }) : Promise<pageEntity> {
        if (!input.nameEn.trim() || !input.nameAr.trim())
            throw new BadRequestException('Arabic or English name or both of them are missed');
        return this.pageRep.create(input)

    }

}