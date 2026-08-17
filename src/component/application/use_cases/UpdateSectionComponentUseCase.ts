import { Inject, Injectable, ForbiddenException, NotFoundException } from "@nestjs/common";
import { pageComponentEntity } from "src/component/domain/entities/pageComponent.entity";
import type { PageComponentRepository } from "src/component/domain/repositories/pageComponent.repository.interface";

@Injectable()
export class UpdateSectionComponentUseCase {
    constructor(@Inject('PageComponentRepository') private PageComponentRep : PageComponentRepository){}

    async execute (
        pageComponentId : number,
        data: Partial<{ data: Record<string, any>; componentSettings: Record<string, any>; index: number; parentId: number | null }>,
        requestingUserId: number,
        requestingUserRole: string,
    ) : Promise<pageComponentEntity> {
        const pageComponent = await this.PageComponentRep.findById(pageComponentId);

        if (!pageComponent) {
            throw new NotFoundException('This component is not found on the section');
        }

        if (requestingUserRole !== 'ADMIN' && pageComponent.createdById !== requestingUserId) {
            throw new ForbiddenException('You are not authorized to update this component');
        }

        return this.PageComponentRep.update(pageComponentId, data);
    }
}
