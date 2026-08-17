import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/infrastructure/prisma/prisma.service';
import type { ComponentRepository } from '../../domain/repositories/component.repository.interface';
import { componentEntity } from '../../domain/entities/component.entity';

@Injectable()
export class PrismaComponentRepository implements ComponentRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: number): Promise<componentEntity | null> {
    const component = await this.prisma.component.findUnique({ where: { id } });
    if (!component) return null;
    return new componentEntity(component.id, component.uuid, component.nameEn, component.nameAr, component.properties as Record<string, any>, component.createdById);
  }

  async create(data: { nameEn: string; nameAr: string; properties: Record<string, any>; createdById: number }): Promise<componentEntity> {
    const created = await this.prisma.component.create({
      data: { nameEn: data.nameEn, nameAr: data.nameAr, properties: data.properties, createdById: data.createdById },
    });
    return new componentEntity(created.id, created.uuid, created.nameEn, created.nameAr, created.properties as Record<string, any>, created.createdById);
  }
}
