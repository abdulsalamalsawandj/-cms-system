import { userEntity } from "../entities/user.entity";

export interface userRepository {
    findByEmail(email : string) : Promise<userEntity | null>;
    findById(id : number) : Promise<userEntity | null>;
    create (data: {
        name : string,
        email : string,
        passwordHash : string,    
    }) : Promise <userEntity>,
}