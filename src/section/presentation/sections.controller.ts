import { Controller, Body, Get, Post, Patch, Delete, Param, ParseIntPipe, UseGuards, Req } from "@nestjs/common";
import type { Request } from "express";
import { CreateSectionUseCase } from "src/section/application/use_cases/CreateSectionUseCase";
import { FindSectionsByPageIdUseCase } from "src/section/application/use_cases/FindSectionsByPageIdUseCase";
import { UpdateSectionUseCase } from "src/section/application/use_cases/UpdateSectionUseCase";
import { DeleteSectionUseCase } from "src/section/application/use_cases/DeleteSectionUseCase";
import { createSectionDto } from "./dto/create-section.dto";
import { updateSectionDto } from "./dto/update-section.dto";
import { AuthGuard } from "src/auth/presentation/guards/authGuard";
import { RoleGuard } from "src/auth/presentation/guards/roleGuard";
import { Roles } from "src/auth/presentation/guards/roles.decorator";
import { Role } from "generated/prisma/enums";

interface AuthenticatedRequest extends Request {
    user: { sub: number; role: Role };
}

@Controller('sections')
export class SectionController {
    constructor(
        private createSectionUseCase : CreateSectionUseCase,
        private findSectionsByPageIdUseCase : FindSectionsByPageIdUseCase,
        private updateSectionUseCase : UpdateSectionUseCase,
        private deleteSectionUseCase : DeleteSectionUseCase,
    ){}

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.ADMIN, Role.CONTENT_CREATOR)
    @Post()
    create (@Body() dto : createSectionDto, @Req() req : AuthenticatedRequest) {
        return this.createSectionUseCase.execute({...dto, createdById : req.user.sub});
    }

    @Get('page/:pageId')
    findByPageId (@Param('pageId', ParseIntPipe) pageId : number) {
        return this.findSectionsByPageIdUseCase.execute(pageId);
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.ADMIN, Role.CONTENT_CREATOR)
    @Patch(':id')
    update (@Param('id', ParseIntPipe) id : number, @Body() dto : updateSectionDto, @Req() req : AuthenticatedRequest) {
        return this.updateSectionUseCase.execute(id, dto, req.user.sub, req.user.role);
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.ADMIN, Role.CONTENT_CREATOR)
    @Delete(':id')
    delete (@Param('id', ParseIntPipe) id : number, @Req() req : AuthenticatedRequest) {
        return this.deleteSectionUseCase.execute(id, req.user.sub, req.user.role);
    }
}
