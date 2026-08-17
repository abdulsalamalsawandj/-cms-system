import {Module} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CreateContactMessageUseCase } from 'src/contact-message/application/use_cases/CreateContactMessageUseCase';
import { FindMyMessagesUseCase } from 'src/contact-message/application/use_cases/FindMyMessagesUseCase';
import { FindAllMessagesUseCase } from 'src/contact-message/application/use_cases/FindAllMessagesUseCase';
import { ReplyToMessageUseCase } from 'src/contact-message/application/use_cases/ReplyToMessageUseCase';
import { ContactMessageController } from './contact-messages.controller';
import { PrismaContactMessageRepository } from 'src/contact-message/infrastructure/repositories/prismaContactMessage.repositories';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
        }),
    ],
    controllers: [ContactMessageController],
    providers: [
        CreateContactMessageUseCase,
        FindMyMessagesUseCase,
        FindAllMessagesUseCase,
        ReplyToMessageUseCase,
        {provide: 'ContactMessageRepository', useClass: PrismaContactMessageRepository}

    ]
}) export class contactMessagesModule{}
