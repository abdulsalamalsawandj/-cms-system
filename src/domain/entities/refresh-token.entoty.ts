export class refreshTokenEntity {
    constructor(
    public id : number,
    public uuid : string,
    public HashedPassword : string,
    public expiresAt : Date,
    public userId : number,
    public revokedAt : Date | null,
    ){}

    isValid () : boolean {
        return this.revokedAt ===null && this.expiresAt > new Date()
    }
}