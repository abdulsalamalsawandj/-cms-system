import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import type { userRepository } from "src/auth/domain/repositories/user.repository.interface";
import type { refreshTokenRepository } from "src/auth/domain/repositories/refresh-token.repository.interface";

@Injectable()
export class loginUseCase {
  constructor(
    @Inject('refreshTokenRepository') private tokenRep: refreshTokenRepository,
    @Inject('userRepository') private userRep: userRepository,
    private jwtService: JwtService,
  ) {}

  async execute(data: { email: string; password: string }) {
    const User = await this.userRep.findByEmail(data.email);
    if (!User) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordValid = await bcrypt.compare(data.password, User.passwordHash);
    if (!passwordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign(
      { sub: User.id, role: User.role },
      { expiresIn: '15m' },
    );

    const refreshTokenValue = this.jwtService.sign({ sub: User.id }, { expiresIn: '7d' });
    const refreshTokenHash = await bcrypt.hash(refreshTokenValue, 10);

    await this.tokenRep.create({
      tokenHash: refreshTokenHash,
      userId: User.id,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return { accessToken, refreshToken: refreshTokenValue };
  }
}