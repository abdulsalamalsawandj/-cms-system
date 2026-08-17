import { Controller, Body, Get, Post, Patch, Delete, Param, ParseIntPipe, UseGuards, Req } from "@nestjs/common";
import type { Request } from "express";
import { createPageUseCase } from "src/page/application/use_cases/createPage.use_case";
import { findAllPagesUseCase } from "src/page/application/use_cases/findAllPages.use_case";
import { publishPageUseCase } from "src/page/application/use_cases/publishPage.use_case";
import { craetePageDto } from "./dto/create-page.dto";
import { deletePageUseCase } from "src/page/application/use_cases/deletePageUse_Case";
import { AuthGuard } from "src/auth/presentation/guards/authGuard";
import { RoleGuard } from "src/auth/presentation/guards/roleGuard";
import { Roles } from "src/auth/presentation/guards/roles.decorator";
import { Role } from "generated/prisma/enums";

interface AuthenticatedRequest extends Request {
    user: { sub: number; role: Role };
}

@Controller('pages')
export class PageController { 
    constructor(
        private createPageUseCase : createPageUseCase,
        private findAllPagesUseCase : findAllPagesUseCase,
        private publishPageUseCase : publishPageUseCase,
        private deletePageUseCase : deletePageUseCase,
    ){}
    @UseGuards(AuthGuard)
    @Post()
    create (@Body() dto : craetePageDto, @Req() req : AuthenticatedRequest) {
        return this.createPageUseCase.execute({...dto, createdById : req.user.sub});
    }

    @Get()
    findAll(){
        return this.findAllPagesUseCase.execute()
    }
    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @Patch(':id/publish')
    publish (@Param('id', ParseIntPipe) id : number, @Req() req : AuthenticatedRequest){
        return this.publishPageUseCase.execute(id, req.user.role)
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @Delete(':id')
    delete (@Param('id', ParseIntPipe) id : number, @Req() req : AuthenticatedRequest){
        return this.deletePageUseCase.execute(id, req.user.role)
    }
}