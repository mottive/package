import { Type } from "../../types/Type";

export class TypeMapValue<TYPE = any, TO = any>{

    constructor(
        protected type:Type<TYPE>,
        protected to:TO
    ){

    }

}
