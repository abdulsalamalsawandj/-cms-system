import { userEntity } from "../entities/user.entity";

export interface userRepository {
    findByEmail(email : string) : Promise<userEntity | null>;
    findById(id : number) : Promise<userEntity | null>;
    create (data: {
        name : string,
        email : string,
        passwordHash : string,
    }) : Promise <userEntity>,
    update (id : number, data: Partial<{name : string; email : string; passwordHash : string}>) : Promise <userEntity>,
    countByRole (role : 'ADMIN' | 'CONTENT_CREATOR' | 'VISITOR') : Promise <number>,
}