import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/infrastructure/prisma/prisma.service';
import type { SectionRepository } from '../../domain/repositories/section.repository.interface';
import { sectionEntity } from '../../domain/entities/section.entity';

@Injectable()
export class PrismaSectionRepository implements SectionRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: number): Promise<sectionEntity | null> {
    const section = await this.prisma.section.findUnique({ where: { id } });
    if (!section) return null;
    return new sectionEntity(section.id, section.uuid, section.nameEn, section.nameAr, section.index, section.pageId, section.createdById);
  }

  async findByPageId(pageId: number): Promise<sectionEntity[]> {
    const sections = await this.prisma.section.findMany({ where: { pageId }, orderBy: { index: 'asc' } });
    return sections.map(s => new sectionEntity(s.id, s.uuid, s.nameEn, s.nameAr, s.index, s.pageId, s.createdById));
  }

  async create(data: { nameEn: string; nameAr: string; pageId: number; createdById: number }): Promise<sectionEntity> {
    const created = await this.prisma.section.create({
      data: { nameEn: data.nameEn, nameAr: data.nameAr, pageId: data.pageId, createdById: data.createdById },
    });
    return new sectionEntity(created.id, created.uuid, created.nameEn, created.nameAr, created.index, created.pageId, created.createdById);
  }

  async update(id: number, data: Partial<{ nameEn: string; nameAr: string; index: number }>): Promise<sectionEntity> {
    const updated = await this.prisma.section.update({ where: { id }, data });
    return new sectionEntity(updated.id, updated.uuid, updated.nameEn, updated.nameAr, updated.index, updated.pageId, updated.createdById);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.section.delete({ where: { id } });
  }
}
