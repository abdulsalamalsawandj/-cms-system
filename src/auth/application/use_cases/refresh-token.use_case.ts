import { Injectable, Inject, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";
import type { userRepository } from "src/auth/domain/repositories/user.repository.interface";
import type { refreshTokenRepository } from "src/auth/domain/repositories/refresh-token.repository.interface";
import { PrismaRefreshTokenRepository } from "src/auth/infrastructure/repositories/prismaRefreshToken.repositories";
import { privateDecrypt } from "crypto";

@Injectable()
export class refreshTokenUseCase {
    constructor(@Inject ('refreshTokenRepository') private readonly refreshRepo : refreshTokenRepository ,
                @Inject ('userRepository') private readonly userRepo : userRepository,
                private JwtService : JwtService){}

                async execute (refreshTokenValue : string) {
                    let payload : {sub : number};
                    try {
                        payload = this.JwtService.verify(refreshTokenValue);
                    } catch {
                        throw new UnauthorizedException('Invalid or expired refresh token')
                    };

                    const user = await this.userRepo.findById(payload.sub);
                    if (!user){
                        throw new UnauthorizedException('user not fond')
                    }

                    const storedToken = await this.refreshRepo.findByReTokenHash(
                        await this.hashLookup(refreshTokenValue),
                    );

                    if(!storedToken || !storedToken.isValid()){
                        throw new UnauthorizedException('refreshToken has been expired ')
                    }
                    const accessToken = this.JwtService.sign(
                        {sub : user.id, role:user.role},
                        {expiresIn : '15m'},
                    );
                    return{accessToken};
                }

                private async hashLookup(tokenValue: string) : Promise<string>{
                    return tokenValue;
                }


}