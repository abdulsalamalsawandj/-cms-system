import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import type { userRepository } from "src/auth/domain/repositories/user.repository.interface";

@Injectable()
export class getProfileUseCase {
    constructor(@Inject('userRepository') private userRep : userRepository){}

    async execute (userId : number) {
        const user = await this.userRep.findById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        return {
            id: user.id,
            uuid: user.uuid,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
        };
    }
}
