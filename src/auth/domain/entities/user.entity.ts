export class userEntity {
    constructor(
    public readonly id: number,
    public readonly uuid: string,
    public readonly name : string,
    public readonly email : string, 
    public readonly passwordHash : string,
    public readonly role : 'ADMIN' | 'CONTENT_CREATOR' | 'VISITOR',){}

}