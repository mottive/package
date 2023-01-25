import { Type } from "../../types/Type";

export class TypeMap<EVENT, VALUE>{

    protected readonly items:Array<[Type<EVENT>, VALUE]>

    constructor(
        ...items:Array<[Type<EVENT>, VALUE]>
    ){
        this.items = items
    }

    get(type:Type<any>){
        return this.items.find(x => type === x[0])
    }

    forEachType(callback:(type:Type<EVENT>, value:VALUE) => void){

        this.items.forEach(([type, value]) => {
            callback(type, value)
        })

    }

}
