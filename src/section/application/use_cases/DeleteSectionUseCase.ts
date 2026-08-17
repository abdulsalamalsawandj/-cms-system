import { Inject, Injectable, ForbiddenException, NotFoundException } from "@nestjs/common";
import type { SectionRepository } from "src/section/domain/repositories/section.repository.interface";

@Injectable()
export class DeleteSectionUseCase {
    constructor(@Inject('SectionRepository') private SectionRep : SectionRepository){}

    async execute(
        sectionId: number,
        requestingUserId: number,
        requestingUserRole: string,
    ) {
        const section = await this.SectionRep.findById(sectionId);

        if (!section) {
            throw new NotFoundException('This section is not found');
        }

        if (requestingUserRole !== 'ADMIN' && section.createdById !== requestingUserId) {
            throw new ForbiddenException('You are not authorized to delete this section');
        }

        return await this.SectionRep.delete(sectionId);
    }
}
