export class userEntity {
    constructor(
    public readonly id: number,
    public readonly uuid: string,
    public readonly name : string,
    public readonly email : string, 
    public readonly HashedPassword : string,
    public readonly Role : 'ADMIN' | 'CONTENT_CREATOR' | 'VISITOR',){}

}