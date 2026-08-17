import {Module} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { CreateComponentUseCase } from 'src/component/application/use_cases/CreateComponentUseCase';
import { AttachComponentToSectionUseCase } from 'src/component/application/use_cases/AttachComponentToSectionUseCase';
import { UpdateSectionComponentUseCase } from 'src/component/application/use_cases/UpdateSectionComponentUseCase';
import { DeleteSectionComponentUseCase } from 'src/component/application/use_cases/DeleteSectionComponentUseCase';
import { FindComponentsBySectionIdUseCase } from 'src/component/application/use_cases/FindComponentsBySectionIdUseCase';
import { ComponentController } from './components.controller';
import { PrismaComponentRepository } from 'src/component/infrastructure/repositories/prismaComponent.repositories';
import { PrismaPageComponentRepository } from 'src/component/infrastructure/repositories/prismaPageComponent.repositories';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
        }),
    ],
    controllers: [ComponentController],
    providers: [
        CreateComponentUseCase,
        AttachComponentToSectionUseCase,
        UpdateSectionComponentUseCase,
        DeleteSectionComponentUseCase,
        FindComponentsBySectionIdUseCase,
        {provide: 'ComponentRepository', useClass: PrismaComponentRepository},
        {provide: 'PageComponentRepository', useClass: PrismaPageComponentRepository},

    ]
}) export class componentsModule{}
