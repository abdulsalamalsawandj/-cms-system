import { Inject, Injectable, ForbiddenException, NotFoundException } from "@nestjs/common";
import type { PageComponentRepository } from "src/component/domain/repositories/pageComponent.repository.interface";

@Injectable()
export class DeleteSectionComponentUseCase {
    constructor(@Inject('PageComponentRepository') private PageComponentRep : PageComponentRepository){}

    async execute(
        pageComponentId: number,
        requestingUserId: number,
        requestingUserRole: string,
    ) {
        const pageComponent = await this.PageComponentRep.findById(pageComponentId);

        if (!pageComponent) {
            throw new NotFoundException('This component is not found on the section');
        }

        if (requestingUserRole !== 'ADMIN' && pageComponent.createdById !== requestingUserId) {
            throw new ForbiddenException('You are not authorized to delete this component');
        }

        return await this.PageComponentRep.delete(pageComponentId);
    }
}
