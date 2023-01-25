import { MicroserviceConfiguration } from "../microservice/MicroserviceConfiguration";
import * as cote from 'cote'
import { DeepClone, Type, types } from "@mottive/engine";
import { CoteJSBaseConfiguration } from "../microservice/CoteJSBaseConfiguration";
import { MessageInput, Event, Header } from "@mottive/messages";
import { messageOfType } from "../../script/functions";

export class Emitter{

    protected publisher:cote.Publisher

    constructor(
        readonly configuration:MicroserviceConfiguration
    ){
        this.publisher = new cote.Publisher(...CoteJSBaseConfiguration(configuration.params))
    }

    echo<T extends string>(message:T, input:any, header?:Header) : any;
    echo<T extends Event>(message:Type<T>, input:MessageInput<T>, header?:Header) : any;
    echo<T extends Event>(message:Type<T>|string, input:MessageInput<T>, header?:Header) : any {

        if( typeof message === 'string' ){
            return this.sendRaw(message, DeepClone.clone(input), header)
        }else{

            const instance = messageOfType(message)

            //
            // faco a validação
            const parse = types.parse(instance.input, input)
            if( !parse.success ){
                console.log('não foi possivel enviar o comando pois o parse apresentou erro', input, parse.errorMessage)
                return
            }

            //
            // crio uma nova instancia dos dados e envio
            return this.sendRaw(instance.name, DeepClone.clone(input), header)

        }

    }

    protected async sendRaw(message:string, input:any, header?:Header){

        //
        // crio uma nova instancia dos dados
        const data = DeepClone.clone(input)

        data['__header'] = header

        return this.publisher.publish(message, data)

    }

}
