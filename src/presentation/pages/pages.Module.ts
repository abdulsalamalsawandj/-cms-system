import {Module} from '@nestjs/common';
import { createPageUseCase } from 'src/application/use_cases/page/createPage.use_case';
import { findAllPagesUseCase } from 'src/application/use_cases/page/findAllPages.use_case';
import { publishPageUseCase } from 'src/application/use_cases/page/publishPage.use_case';
import { PageController } from './pages.controller';
import { PrismaPageRepository } from 'src/infrastructure/repositories/prismaPage.repositories';
import { deletePageUseCase } from 'src/application/use_cases/page/deletePageUse_Case';

@Module({
    controllers: [PageController],
    providers: [
        createPageUseCase,
        findAllPagesUseCase, 
        publishPageUseCase,
        deletePageUseCase,
        {provide: 'PageRepository', useClass: PrismaPageRepository}
        
    ]
}) export class pagesModule{}
