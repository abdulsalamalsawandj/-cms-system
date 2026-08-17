import { Injectable, Inject, ConflictException, BadRequestException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';
import type { userRepository } from "src/auth/domain/repositories/user.repository.interface";

@Injectable()
export class updateProfileUseCase {
    constructor(@Inject('userRepository') private userRep : userRepository){}

    async execute (userId : number, input : {
        name? : string;
        email? : string;
        password? : string;
    }) {
        if (input.name !== undefined && !input.name.trim()) {
            throw new BadRequestException('Name cannot be empty');
        }

        if (input.email !== undefined) {
            const existing = await this.userRep.findByEmail(input.email);
            if (existing && existing.id !== userId) {
                throw new ConflictException('this email is already existed');
            }
        }

        const data: Partial<{ name: string; email: string; passwordHash: string }> = {};
        if (input.name !== undefined) data.name = input.name;
        if (input.email !== undefined) data.email = input.email;
        if (input.password !== undefined) data.passwordHash = await bcrypt.hash(input.password, 10);

        const updated = await this.userRep.update(userId, data);

        return {
            id: updated.id,
            uuid: updated.uuid,
            name: updated.name,
            email: updated.email,
            role: updated.role,
            createdAt: updated.createdAt,
        };
    }
}
