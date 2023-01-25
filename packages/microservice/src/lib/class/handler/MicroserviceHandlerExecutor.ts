
import { Handler, Package } from "@mottive/messages";
import { Type } from "@mottive/engine";
import { ErrorVault } from "@mottive/error-vault";

export class MicroserviceHandlerExecutor{

    constructor(
        readonly pack:Package<any>
    ){

    }

    async handle(handler_type:Type<Handler<any>>){

        try{

            const instance = new handler_type(this.pack.data, this.pack.header)
            const sandbox = Object.assign(
                instance,
                {
                    'sandbox': 'yes',
                    'data': this.pack.data,
                    'header': this.pack.header,
                }
            )

            return await instance.handle.apply(
                sandbox,
                []
            )

        }catch(e){
            ErrorVault.instance().add(e)
        }

    }

}
