import { Injectable, Inject } from "@nestjs/common";
import { dashboardStatsEntity } from "src/dashboard/domain/entities/dashboardStats.entity";
import type { userRepository } from "src/auth/domain/repositories/user.repository.interface";
import type { PageRepository } from "src/page/domain/repositories/page.repository.interface";
import type { ContactMessageRepository } from "src/contact-message/domain/repositories/contactMessage.repository.interface";

@Injectable()
export class GetDashboardStatsUseCase {
    constructor(
        @Inject('userRepository') private userRep : userRepository,
        @Inject('PageRepository') private pageRep : PageRepository,
        @Inject('ContactMessageRepository') private contactMessageRep : ContactMessageRepository,
    ){}

    async execute () : Promise<dashboardStatsEntity> {
        const [visitorsCount, publishedPagesCount, contactMessagesCount] = await Promise.all([
            this.userRep.countByRole('VISITOR'),
            this.pageRep.countPublished(),
            this.contactMessageRep.count(),
        ]);

        return new dashboardStatsEntity(visitorsCount, publishedPagesCount, contactMessagesCount);
    }
}
