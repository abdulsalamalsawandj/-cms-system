import { Controller, Body, Get, Post, Patch, Param, ParseIntPipe, UseGuards, Req } from "@nestjs/common";
import type { Request } from "express";
import { CreateContactMessageUseCase } from "src/contact-message/application/use_cases/CreateContactMessageUseCase";
import { FindMyMessagesUseCase } from "src/contact-message/application/use_cases/FindMyMessagesUseCase";
import { FindAllMessagesUseCase } from "src/contact-message/application/use_cases/FindAllMessagesUseCase";
import { ReplyToMessageUseCase } from "src/contact-message/application/use_cases/ReplyToMessageUseCase";
import { createContactMessageDto } from "./dto/create-contact-message.dto";
import { replyContactMessageDto } from "./dto/reply-contact-message.dto";
import { AuthGuard } from "src/auth/presentation/guards/authGuard";
import { RoleGuard } from "src/auth/presentation/guards/roleGuard";
import { Roles } from "src/auth/presentation/guards/roles.decorator";
import { Role } from "generated/prisma/enums";

interface AuthenticatedRequest extends Request {
    user: { sub: number; role: Role };
}

@Controller('contact-messages')
export class ContactMessageController {
    constructor(
        private createContactMessageUseCase : CreateContactMessageUseCase,
        private findMyMessagesUseCase : FindMyMessagesUseCase,
        private findAllMessagesUseCase : FindAllMessagesUseCase,
        private replyToMessageUseCase : ReplyToMessageUseCase,
    ){}

    @UseGuards(AuthGuard)
    @Post()
    create (@Body() dto : createContactMessageDto, @Req() req : AuthenticatedRequest) {
        return this.createContactMessageUseCase.execute({ message: dto.message, visitorId: req.user.sub });
    }

    @UseGuards(AuthGuard)
    @Get('mine')
    findMine (@Req() req : AuthenticatedRequest) {
        return this.findMyMessagesUseCase.execute(req.user.sub);
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @Get()
    findAll (@Req() req : AuthenticatedRequest) {
        return this.findAllMessagesUseCase.execute(req.user.role);
    }

    @UseGuards(AuthGuard, RoleGuard)
    @Roles(Role.ADMIN)
    @Patch(':id/reply')
    reply (@Param('id', ParseIntPipe) id : number, @Body() dto : replyContactMessageDto, @Req() req : AuthenticatedRequest) {
        return this.replyToMessageUseCase.execute(id, dto.adminReply, req.user.role);
    }
}
