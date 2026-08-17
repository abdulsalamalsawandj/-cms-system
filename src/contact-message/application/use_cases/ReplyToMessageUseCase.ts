import { Inject, Injectable, BadRequestException, ForbiddenException, NotFoundException } from "@nestjs/common";
import { contactMessageEntity } from "src/contact-message/domain/entities/contactMessage.entity";
import type { ContactMessageRepository } from "src/contact-message/domain/repositories/contactMessage.repository.interface";

@Injectable()
export class ReplyToMessageUseCase {
    constructor(@Inject('ContactMessageRepository') private ContactMessageRep : ContactMessageRepository){}

    async execute (messageId : number, adminReply : string, requestingUserRole : string) : Promise<contactMessageEntity> {
        if (requestingUserRole !== 'ADMIN'){
            throw new ForbiddenException('Only Admins Can Reply To Messages');
        }

        if (!adminReply.trim()){
            throw new BadRequestException('Reply cannot be empty');
        }

        const message = await this.ContactMessageRep.findById(messageId);
        if (!message){
            throw new NotFoundException('This message is not found');
        }

        return this.ContactMessageRep.reply(messageId, adminReply);
    }
}
