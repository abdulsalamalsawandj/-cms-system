import type { contactMessageEntity } from "../entities/contactMessage.entity";

export interface ContactMessageRepository {
    findById(id : number): Promise<contactMessageEntity | null>;
    findAll() : Promise <contactMessageEntity[]>
    findByVisitorId(visitorId : number) : Promise <contactMessageEntity[]>
    create (data : {
        visitorId : number;
        message : string;
    }) : Promise <contactMessageEntity>;
    reply(id : number, adminReply : string) : Promise <contactMessageEntity>;
    count() : Promise <number>;


}
