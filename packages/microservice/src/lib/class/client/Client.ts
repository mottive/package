import { MicroserviceConfiguration } from "../microservice/MicroserviceConfiguration";
import * as cote from 'cote'
import { DeepClone, Type, types } from "@mottive/engine";
import { messageOfType } from "../../script/functions";
import { CoteJSBaseConfiguration } from "../microservice/CoteJSBaseConfiguration";
import { Command, Header, MessageInput } from "@mottive/messages";

export class Client{

    protected requester:cote.Requester

    constructor(
        readonly configuration:MicroserviceConfiguration
    ){
        this.requester = new cote.Requester(...CoteJSBaseConfiguration(configuration.params))
    }

    /**
     * Envia um comando e espera a resposta
     */
    async sync<T extends Command>(message:Type<T>, input:MessageInput<T>, header?:Header){

        //
        // crio uma nova instancia dos dados
        const data = DeepClone.clone(input)

        data['__sync'] = true

        return await this.send(message, data, header)

    }

    /**
     * Envia um comando e não espera uma resposta
     */
    async send<T extends Command>(message:Type<T>|string, input:MessageInput<T>, header?:Header){

        if( typeof message === 'string' ){
            return await this.sendRaw(message, input, header)
        }else{

            const instance = messageOfType(message)

            //
            // validação zod
            const parse = types.parse(instance.input, input)

            if( !parse.success ){
                console.log('não foi possivel enviar o comando pois o parse apresentou erro')
                console.log(input)
                console.log(parse.errorMessage)
                return
            }

            return await this.sendRaw(instance.name, DeepClone.clone(input), header)

        }

    }

    protected async sendRaw(message:string, input:any, header?:Header){

        //
        // crio uma nova instancia dos dados
        const data = DeepClone.clone(input)

        data['type'] = message
        data['__header'] = header

        return await this.requester.send(data)

    }

}
