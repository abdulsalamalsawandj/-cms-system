export class pageComponentEntity {
    constructor (
        public readonly id : number,
        public readonly uuid : string,
        public readonly sectionId : number,
        public readonly componentId : number,
        public readonly data : Record<string, any>,
        public readonly componentSettings : Record<string, any>,
        public readonly index : number,
        public readonly parentId : number | null,
        public readonly createdById : number,
    ){}
}
