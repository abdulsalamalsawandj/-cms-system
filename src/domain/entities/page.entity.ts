export class pageEntity {
    constructor (
        public readonly id : number,
        public readonly uuid : string,
        public readonly nameEn : string,
        public readonly nameAr : string,
        public readonly isPublished : boolean,
        public readonly index : number,
        public readonly createdById : number,
    ){}

    canBePublished(): boolean {
        return this.nameEn.trim().length >  0 && this.nameAr.trim().length > 0;
    }
}