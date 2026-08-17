export class contactMessageEntity {
    constructor (
        public readonly id : number,
        public readonly uuid : string,
        public readonly visitorId : number,
        public readonly message : string,
        public readonly adminReply : string | null,
        public readonly repliedAt : Date | null,
        public readonly createdAt : Date,
    ){}
}
