import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/infrastructure/prisma/prisma.service';
import type { userRepository } from '../../domain/repositories/user.repository.interface';
import { userEntity } from '../../domain/entities/user.entity';

@Injectable()
export class PrismaUserRepository implements userRepository {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string): Promise<userEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    return new userEntity(user.id, user.uuid, user.name, user.email, user.passwordHash, user.role, user.createdAt);
  }

  async findById(id: number): Promise<userEntity | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) return null;
    return new userEntity(user.id, user.uuid, user.name, user.email, user.passwordHash, user.role, user.createdAt);
  }

  async create(data: { name: string; email: string; passwordHash: string }): Promise<userEntity> {
    const created = await this.prisma.user.create({ data });
    return new userEntity(created.id, created.uuid, created.name, created.email, created.passwordHash, created.role, created.createdAt);
  }

  async update(id: number, data: Partial<{ name: string; email: string; passwordHash: string }>): Promise<userEntity> {
    const updated = await this.prisma.user.update({ where: { id }, data });
    return new userEntity(updated.id, updated.uuid, updated.name, updated.email, updated.passwordHash, updated.role, updated.createdAt);
  }

  async countByRole(role: 'ADMIN' | 'CONTENT_CREATOR' | 'VISITOR'): Promise<number> {
    return this.prisma.user.count({ where: { role } });
  }
}