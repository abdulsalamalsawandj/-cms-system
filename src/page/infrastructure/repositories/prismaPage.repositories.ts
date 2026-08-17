import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/infrastructure/prisma/prisma.service';
import type { PageRepository } from '../../domain/repositories/page.repository.interface';
import { pageEntity } from '../../domain/entities/page.entity';

@Injectable()
export class PrismaPageRepository implements PageRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: number): Promise<pageEntity | null> {
    const page = await this.prisma.page.findUnique({ where: { id } });
    if (!page) return null;
    return new pageEntity(page.id, page.uuid, page.nameEn, page.nameAr, page.isPublished, page.index, page.createdById);
  }

  async findAll(): Promise<pageEntity[]> {
    const pages = await this.prisma.page.findMany();
    return pages.map(p => new pageEntity(p.id, p.uuid, p.nameEn, p.nameAr, p.isPublished, p.index, p.createdById));
  }

  async create(data: { nameEn: string; nameAr: string; createdById: number }): Promise<pageEntity> {
    const created = await this.prisma.page.create({
      data: { nameEn: data.nameEn, nameAr: data.nameAr, createdById: data.createdById },
    });
    return new pageEntity(created.id, created.uuid, created.nameEn, created.nameAr, created.isPublished, created.index, created.createdById);
  }

  async update(id: number, data: Partial<{ nameEn: string; nameAr: string; index: number }>): Promise<pageEntity> {
    const updated = await this.prisma.page.update({ where: { id }, data });
    return new pageEntity(updated.id, updated.uuid, updated.nameEn, updated.nameAr, updated.isPublished, updated.index, updated.createdById);
  }

  async publish(id: number): Promise<void> {
    await this.prisma.page.update({ where: { id }, data: { isPublished: true } });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.page.delete({ where: { id } });
  }
}