import {Module} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { GetDashboardStatsUseCase } from 'src/dashboard/application/use_cases/GetDashboardStatsUseCase';
import { DashboardController } from './dashboard.controller';
import { PrismaUserRepository } from 'src/auth/infrastructure/repositories/prismaUser.repositories';
import { PrismaPageRepository } from 'src/page/infrastructure/repositories/prismaPage.repositories';
import { PrismaContactMessageRepository } from 'src/contact-message/infrastructure/repositories/prismaContactMessage.repositories';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
        }),
    ],
    controllers: [DashboardController],
    providers: [
        GetDashboardStatsUseCase,
        {provide: 'userRepository', useClass: PrismaUserRepository},
        {provide: 'PageRepository', useClass: PrismaPageRepository},
        {provide: 'ContactMessageRepository', useClass: PrismaContactMessageRepository},

    ]
}) export class dashboardModule{}
