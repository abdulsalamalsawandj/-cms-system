import { Inject ,Injectable,BadRequestException,  ForbiddenException, NotFoundException } from "@nestjs/common";
import type { PageRepository } from "src/domain/repositories/page.repository.interface";

@Injectable()
export class deletePageUseCase {
       constructor (@Inject ('PageRepository') private readonly repPage : PageRepository){}
       async execute(
         PageId: number,
         RequestingUserRole: string
     ) {
     
         if (RequestingUserRole !== 'ADMIN') {
             throw new ForbiddenException(
                 "You are not authorized to delete this page"
             );
         }
     
         if (!PageId) {
             throw new NotFoundException(
                 "This page is not found"
             );
         }
     
         const page = await this.repPage.findById(PageId);
     
         if (!page) {
             throw new NotFoundException(
                 "This page is not found"
             );
         }
     
         return await this.repPage.delete(PageId);
     }
}