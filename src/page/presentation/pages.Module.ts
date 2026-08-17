import {Module} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { createPageUseCase } from 'src/page/application/use_cases/createPage.use_case';
import { findAllPagesUseCase } from 'src/page/application/use_cases/findAllPages.use_case';
import { publishPageUseCase } from 'src/page/application/use_cases/publishPage.use_case';
import { PageController } from './pages.controller';
import { PrismaPageRepository } from 'src/page/infrastructure/repositories/prismaPage.repositories';
import { deletePageUseCase } from 'src/page/application/use_cases/deletePageUse_Case';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
        }),
    ],
    controllers: [PageController],
    providers: [
        createPageUseCase,
        findAllPagesUseCase, 
        publishPageUseCase,
        deletePageUseCase,
        {provide: 'PageRepository', useClass: PrismaPageRepository}
        
    ]
}) export class pagesModule{}
