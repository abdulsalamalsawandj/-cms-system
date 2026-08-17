export class componentEntity {
    constructor (
        public readonly id : number,
        public readonly uuid : string,
        public readonly nameEn : string,
        public readonly nameAr : string,
        public readonly properties : Record<string, any>,
        public readonly createdById : number,
    ){}
}
