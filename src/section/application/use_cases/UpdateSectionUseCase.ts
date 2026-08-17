import { Inject, Injectable, BadRequestException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { sectionEntity } from "src/section/domain/entities/section.entity";
import type { SectionRepository } from "src/section/domain/repositories/section.repository.interface";

@Injectable()
export class UpdateSectionUseCase {
    constructor(@Inject('SectionRepository') private SectionRep : SectionRepository){}

    async execute (
        sectionId : number,
        data: Partial<{ nameEn: string; nameAr: string; index: number }>,
        requestingUserId: number,
        requestingUserRole: string,
    ) : Promise<sectionEntity> {
        const section = await this.SectionRep.findById(sectionId);

        if (!section) {
            throw new NotFoundException('This section is not found');
        }

        if (requestingUserRole !== 'ADMIN' && section.createdById !== requestingUserId) {
            throw new ForbiddenException('You are not authorized to update this section');
        }

        if (data.nameEn !== undefined && !data.nameEn.trim()) {
            throw new BadRequestException('English name cannot be empty');
        }
        if (data.nameAr !== undefined && !data.nameAr.trim()) {
            throw new BadRequestException('Arabic name cannot be empty');
        }

        return this.SectionRep.update(sectionId, data);
    }
}
