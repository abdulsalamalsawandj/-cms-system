import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { componentEntity } from "src/component/domain/entities/component.entity";
import type { ComponentRepository } from "src/component/domain/repositories/component.repository.interface";

@Injectable()
export class CreateComponentUseCase {
    constructor(@Inject('ComponentRepository') private ComponentRep : ComponentRepository){}

    async execute (input : {
        nameEn : string;
        nameAr : string;
        properties : Record<string, any>;
        createdById : number,
    }) : Promise<componentEntity> {
        if (!input.nameEn.trim() || !input.nameAr.trim()){
            throw new BadRequestException('Arabic or English name or both of them are missed');
        }
        return this.ComponentRep.create(input);
    }
}
