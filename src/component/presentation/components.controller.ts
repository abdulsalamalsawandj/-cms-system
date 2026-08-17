import { Controller, Body, Get, Post, Patch, Delete, Param, ParseIntPipe, UseGuards, Req } from "@nestjs/common";
import type { Request } from "express";
import { CreateComponentUseCase } from "src/component/application/use_cases/CreateComponentUseCase";
import { AttachComponentToSectionUseCase } from "src/component/application/use_cases/AttachComponentToSectionUseCase";
import { UpdateSectionComponentUseCase } from "src/component/application/use_cases/UpdateSectionComponentUseCase";
import { DeleteSectionComponentUseCase } from "src/component/application/use_cases/DeleteSectionComponentUseCase";
import { FindComponentsBySectionIdUseCase } from "src/component/application/use_cases/FindComponentsBySectionIdUseCase";
import { createComponentDto } from "./dto/create-component.dto";
import { attachComponentDto } from "./dto/attach-component.dto";
import { updateSectionComponentDto } from "./dto/update-section-component.dto";
import { AuthGuard } from "src/auth/presentation/guards/authGuard";
import { RoleGuard } from "src/auth/presentation/guards/roleGuard";
import { Roles } from "src/auth/presentation/guards/roles.decorator";
import { Role } from "generated/prisma/enums";

interface AuthenticatedRequest extends Request {
    user: { sub: number; role: Role };
}

@Controller('components')
export class ComponentController {
    constructor(
        private createComponentUseCase : CreateComponentUseCase,
        private attachComponentToSectionUseCase : AttachComponentToSectionUseCase,
        private updateSectionComponentUseCase : UpdateSectionComponentUseCase,
        private deleteSectionComponentUseCase : DeleteSectionComponentUseCase,
        private findComponentsBySectionIdUseCase : FindComponentsBySectionIdUseCase,
    ){}

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.ADMIN, Role.CONTENT_CREATOR)
    @Post()
    create (@Body() dto : createComponentDto, @Req() req : AuthenticatedRequest) {
        return this.createComponentUseCase.execute({...dto, createdById : req.user.sub});
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.ADMIN, Role.CONTENT_CREATOR)
    @Post('section-components/section/:sectionId')
    attach (@Param('sectionId', ParseIntPipe) sectionId : number, @Body() dto : attachComponentDto, @Req() req : AuthenticatedRequest) {
        return this.attachComponentToSectionUseCase.execute({...dto, sectionId, createdById : req.user.sub});
    }

    @Get('section-components/section/:sectionId')
    findBySectionId (@Param('sectionId', ParseIntPipe) sectionId : number) {
        return this.findComponentsBySectionIdUseCase.execute(sectionId);
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.ADMIN, Role.CONTENT_CREATOR)
    @Patch('section-components/:id')
    update (@Param('id', ParseIntPipe) id : number, @Body() dto : updateSectionComponentDto, @Req() req : AuthenticatedRequest) {
        return this.updateSectionComponentUseCase.execute(id, dto, req.user.sub, req.user.role);
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.ADMIN, Role.CONTENT_CREATOR)
    @Delete('section-components/:id')
    delete (@Param('id', ParseIntPipe) id : number, @Req() req : AuthenticatedRequest) {
        return this.deleteSectionComponentUseCase.execute(id, req.user.sub, req.user.role);
    }
}
