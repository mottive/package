import { Command, Handler, Header, MessageInput, Package } from "@mottive/messages";
import { EventListener, Type } from "@mottive/engine";
import * as cote from 'cote';
import { clearPackageData } from "../../script/clear-handler-data";
import { handlerOf, messageOfHandlerType } from "../../script/functions";
import { EventReceiver } from "../event-receiver/event-receiver";
import { MicroserviceHandlerExecutor } from "../handler/MicroserviceHandlerExecutor";
import { CoteJSBaseConfiguration } from "../microservice/CoteJSBaseConfiguration";
import { MicroserviceConfiguration } from "../microservice/MicroserviceConfiguration";

export class Server extends EventReceiver{

    protected responder:cote.Responder

    constructor(
        readonly configuration:MicroserviceConfiguration
    ){
        super()
        this.responder = new cote.Responder(...CoteJSBaseConfiguration(configuration.params))
        this.initialize()
    }

    protected initialize(){
        this.initializeOnAnyListener(this.responder)
    }

    protected raiseError(e:any){
        throw e
    }

    listen(handler:Type<Handler<any>>){

        const handlerInstance = handlerOf(handler)
        const message = messageOfHandlerType(handler)

        console.log('cmd', message.name)

        //
        // registro o evento

        this.responder.on(
            message.name,
            async (event:cote.Event & Record<string, any> & {__sync?:boolean, __header:Header}, callback) => {

                console.log('rcv:', message.name)

                const pack = new Package(
                    message.name,
                    clearPackageData(event),
                    event.__header ?? null
                )

                //
                // retorno para o microservico que o comando
                // foi recebido com sucesso
                callback(null, true)

                //
                // executo o handler do evento
                const executor = new MicroserviceHandlerExecutor(pack)
                await executor.handle(handler)

                //
                // indico que uma menasgem foi recebida
                this.onMessageReceived(pack)

            }

        )

    }

}
