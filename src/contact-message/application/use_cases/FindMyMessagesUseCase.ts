import { Inject, Injectable } from "@nestjs/common";
import { contactMessageEntity } from "src/contact-message/domain/entities/contactMessage.entity";
import type { ContactMessageRepository } from "src/contact-message/domain/repositories/contactMessage.repository.interface";

@Injectable()
export class FindMyMessagesUseCase {
    constructor(@Inject('ContactMessageRepository') private ContactMessageRep : ContactMessageRepository){}

    async execute (visitorId : number) : Promise<contactMessageEntity[]> {
        return this.ContactMessageRep.findByVisitorId(visitorId);
    }
}
