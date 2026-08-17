export class sectionEntity {
    constructor (
        public readonly id : number,
        public readonly uuid : string,
        public readonly nameEn : string,
        public readonly nameAr : string,
        public readonly index : number,
        public readonly pageId : number,
        public readonly createdById : number,
    ){}
}
