import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/infrastructure/prisma/prisma.service';
import type { PageComponentRepository } from '../../domain/repositories/pageComponent.repository.interface';
import { pageComponentEntity } from '../../domain/entities/pageComponent.entity';

type PageComponentRow = {
  id: number;
  uuid: string;
  sectionId: number;
  componentId: number;
  data: unknown;
  componentSettings: unknown;
  index: number;
  parentId: number | null;
  createdById: number;
};

@Injectable()
export class PrismaPageComponentRepository implements PageComponentRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: number): Promise<pageComponentEntity | null> {
    const pageComponent = await this.prisma.pageComponent.findUnique({ where: { id } });
    if (!pageComponent) return null;
    return this.toEntity(pageComponent);
  }

  async findBySectionId(sectionId: number): Promise<pageComponentEntity[]> {
    const pageComponents = await this.prisma.pageComponent.findMany({ where: { sectionId }, orderBy: { index: 'asc' } });
    return pageComponents.map(pc => this.toEntity(pc));
  }

  async create(input: {
    sectionId: number;
    componentId: number;
    data: Record<string, any>;
    componentSettings: Record<string, any>;
    index: number;
    parentId: number | null;
    createdById: number;
  }): Promise<pageComponentEntity> {
    const created = await this.prisma.pageComponent.create({
      data: {
        sectionId: input.sectionId,
        componentId: input.componentId,
        data: input.data,
        componentSettings: input.componentSettings,
        index: input.index,
        parentId: input.parentId,
        createdById: input.createdById,
      },
    });
    return this.toEntity(created);
  }

  async update(id: number, data: Partial<{ data: Record<string, any>; componentSettings: Record<string, any>; index: number; parentId: number | null }>): Promise<pageComponentEntity> {
    const updated = await this.prisma.pageComponent.update({ where: { id }, data });
    return this.toEntity(updated);
  }

  async delete(id: number): Promise<void> {
    await this.prisma.pageComponent.delete({ where: { id } });
  }

  private toEntity(pageComponent: PageComponentRow): pageComponentEntity {
    return new pageComponentEntity(
      pageComponent.id,
      pageComponent.uuid,
      pageComponent.sectionId,
      pageComponent.componentId,
      pageComponent.data as Record<string, any>,
      pageComponent.componentSettings as Record<string, any>,
      pageComponent.index,
      pageComponent.parentId,
      pageComponent.createdById,
    );
  }
}
