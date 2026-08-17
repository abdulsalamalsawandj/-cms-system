import { Inject, Injectable, ForbiddenException } from "@nestjs/common";
import { contactMessageEntity } from "src/contact-message/domain/entities/contactMessage.entity";
import type { ContactMessageRepository } from "src/contact-message/domain/repositories/contactMessage.repository.interface";

@Injectable()
export class FindAllMessagesUseCase {
    constructor(@Inject('ContactMessageRepository') private ContactMessageRep : ContactMessageRepository){}

    async execute (requestingUserRole : string) : Promise<contactMessageEntity[]> {
        if (requestingUserRole !== 'ADMIN'){
            throw new ForbiddenException('Only Admins Can View All Messages');
        }
        return this.ContactMessageRep.findAll();
    }
}
