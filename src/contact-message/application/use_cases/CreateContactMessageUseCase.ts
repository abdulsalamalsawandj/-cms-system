import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { contactMessageEntity } from "src/contact-message/domain/entities/contactMessage.entity";
import type { ContactMessageRepository } from "src/contact-message/domain/repositories/contactMessage.repository.interface";

@Injectable()
export class CreateContactMessageUseCase {
    constructor(@Inject('ContactMessageRepository') private ContactMessageRep : ContactMessageRepository){}

    async execute (input : {
        visitorId : number;
        message : string;
    }) : Promise<contactMessageEntity> {
        if (!input.message.trim()){
            throw new BadRequestException('Message cannot be empty');
        }
        return this.ContactMessageRep.create(input);
    }
}
