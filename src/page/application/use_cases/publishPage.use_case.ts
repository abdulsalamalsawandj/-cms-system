import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import type { PageRepository } from "src/page/domain/repositories/page.repository.interface";
import type { pageEntity } from "src/page/domain/entities/page.entity";
import { ForbiddenException, NotFoundException } from "@nestjs/common";

@Injectable()
export class publishPageUseCase {
    constructor(
        @Inject('PageRepository') private pageRep : PageRepository
    ){}
    async execute (PageId: number, RequestingUserRole: string){
        if (RequestingUserRole !== 'ADMIN'){ 
            throw new ForbiddenException('Only Admins Can Publish');
        }
        
        const page = await this.pageRep.findById(PageId);
        if(!page) {
            throw new NotFoundException('Page Not Found');
        }

        if (!page.canBePublished()){
            throw new BadRequestException('Page Cannot Be Publishef')
        }
        await this.pageRep.publish(PageId);
    }

}