import { Type } from "@mottive/engine";
import { Handler } from "./Handler";

export class HandlerExecutor{

    constructor(
        readonly handler_type:Type<Handler<any>>,
        readonly data:any,
        readonly header?:any
    ){

    }

    async execute(){

        const instance = new this.handler_type(this.data)
        await instance.handle()

    }

}
