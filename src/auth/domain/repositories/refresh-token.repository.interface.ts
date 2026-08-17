import { refreshTokenEntity } from "../entities/refresh-token.entity";

export interface refreshTokenRepository {
    create (data : {
        tokenHash : string;
        userId : number;
        expiresAt : Date; 
    }
    ) : Promise<refreshTokenEntity>;

    findByReTokenHash (tokenHash: string) : Promise<refreshTokenEntity | null>;
    revoke(id : number) : Promise <void>;
}