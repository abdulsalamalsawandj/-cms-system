import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/infrastructure/prisma/prisma.service';
import type { ContactMessageRepository } from '../../domain/repositories/contactMessage.repository.interface';
import { contactMessageEntity } from '../../domain/entities/contactMessage.entity';

type ContactMessageRow = {
  id: number;
  uuid: string;
  visitorId: number;
  message: string;
  adminReply: string | null;
  repliedAt: Date | null;
  createdAt: Date;
};

@Injectable()
export class PrismaContactMessageRepository implements ContactMessageRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: number): Promise<contactMessageEntity | null> {
    const message = await this.prisma.contactMessage.findUnique({ where: { id } });
    if (!message) return null;
    return this.toEntity(message);
  }

  async findAll(): Promise<contactMessageEntity[]> {
    const messages = await this.prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
    return messages.map(m => this.toEntity(m));
  }

  async findByVisitorId(visitorId: number): Promise<contactMessageEntity[]> {
    const messages = await this.prisma.contactMessage.findMany({ where: { visitorId }, orderBy: { createdAt: 'desc' } });
    return messages.map(m => this.toEntity(m));
  }

  async create(data: { visitorId: number; message: string }): Promise<contactMessageEntity> {
    const created = await this.prisma.contactMessage.create({
      data: { visitorId: data.visitorId, message: data.message },
    });
    return this.toEntity(created);
  }

  async reply(id: number, adminReply: string): Promise<contactMessageEntity> {
    const updated = await this.prisma.contactMessage.update({
      where: { id },
      data: { adminReply, repliedAt: new Date() },
    });
    return this.toEntity(updated);
  }

  async count(): Promise<number> {
    return this.prisma.contactMessage.count();
  }

  private toEntity(message: ContactMessageRow): contactMessageEntity {
    return new contactMessageEntity(message.id, message.uuid, message.visitorId, message.message, message.adminReply, message.repliedAt, message.createdAt);
  }
}
