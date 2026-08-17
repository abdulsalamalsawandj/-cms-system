import {Module} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CreateSectionUseCase } from 'src/section/application/use_cases/CreateSectionUseCase';
import { FindSectionsByPageIdUseCase } from 'src/section/application/use_cases/FindSectionsByPageIdUseCase';
import { UpdateSectionUseCase } from 'src/section/application/use_cases/UpdateSectionUseCase';
import { DeleteSectionUseCase } from 'src/section/application/use_cases/DeleteSectionUseCase';
import { SectionController } from './sections.controller';
import { PrismaSectionRepository } from 'src/section/infrastructure/repositories/prismaSection.repositories';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
        }),
    ],
    controllers: [SectionController],
    providers: [
        CreateSectionUseCase,
        FindSectionsByPageIdUseCase,
        UpdateSectionUseCase,
        DeleteSectionUseCase,
        {provide: 'SectionRepository', useClass: PrismaSectionRepository}

    ]
}) export class sectionsModule{}
