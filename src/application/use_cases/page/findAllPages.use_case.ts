import { Inject, Injectable, BadRequestException,  } from "@nestjs/common";
import { pageEntity } from "src/domain/entities/page.entity";
import type { PageRepository } from "src/domain/repositories/page.repository.interface";

@Injectable()
export class findAllPagesUseCase {
    constructor(@Inject('PageRepository') private pageRep : PageRepository){}

    async execute () : Promise<pageEntity[]> { 
        return this.pageRep.findAll();

    }
}