import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import type { refreshTokenRepository } from '../../domain/repositories/refresh-token.repository.interface';
import { refreshTokenEntity } from '../../domain/entities/refresh-token.entoty';

@Injectable()
export class PrismaRefreshTokenRepository implements refreshTokenRepository {
  constructor(private prisma: PrismaService) {}

  async create(data: { tokenHash: string; userId: number; expiresAt: Date }): Promise<refreshTokenEntity> {
    const created = await this.prisma.refreshToken.create({ data });
    return new refreshTokenEntity(created.id, created.uuid, created.tokenHash, created.expiresAt, created.userId, created.revokedAt);
  }

  async findByReTokenHash(tokenHash: string): Promise<refreshTokenEntity | null> {
    const token = await this.prisma.refreshToken.findFirst({ where: { tokenHash } });
    if (!token) return null;
    return new refreshTokenEntity(token.id, token.uuid, token.tokenHash, token.expiresAt, token.userId, token.revokedAt);
  }

  async revoke(id: number): Promise<void> {
    await this.prisma.refreshToken.update({ where: { id }, data: { revokedAt: new Date() } });
  }
}
