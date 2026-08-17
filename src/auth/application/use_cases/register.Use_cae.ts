import { Injectable, Inject, ConflictException } from "@nestjs/common";
import type { userRepository } from "src/auth/domain/repositories/user.repository.interface";
import * as bcrypt from 'bcrypt';
import { emit } from "process";

@Injectable()
export class registerUserUseCase {
    constructor (@Inject ('userRepository') private userRep : userRepository){}

    async execute (input : {
        name : string, email : string, password : string
    })
    {
        const existed = await this.userRep.findByEmail(input.email);
        if (existed) {
            throw new ConflictException('this email is already existed');
        }
        const HashedPassword = await bcrypt.hash(input.password, 10);
        return this.userRep.create({
            name : input.name,
            email : input.email,
            passwordHash: HashedPassword,
        })

    }
    

}
 
