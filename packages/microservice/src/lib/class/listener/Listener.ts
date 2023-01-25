import { Handler, Header, Package } from "@mottive/messages";
import { Type } from "@mottive/engine";
import * as cote from 'cote';
import { clearPackageData } from "../../script/clear-handler-data";
import { messageOfHandlerType } from "../../script/functions";
import { EventReceiver } from "../event-receiver/event-receiver";
import { MicroserviceHandlerExecutor } from "../handler/MicroserviceHandlerExecutor";
import { CoteJSBaseConfiguration } from "../microservice/CoteJSBaseConfiguration";
import { MicroserviceConfiguration } from "../microservice/MicroserviceConfiguration";

export class Listener extends EventReceiver{

    protected subscriber:cote.Subscriber

    constructor(
        readonly configuration:MicroserviceConfiguration
    ){
        super()
        this.subscriber = new cote.Subscriber(...CoteJSBaseConfiguration(configuration.params))
        this.initialize()
    }

    protected initialize(){
        this.initializeOnAnyListener(this.subscriber)
    }

    listen(handler:Type<Handler<any>>){

        const header = messageOfHandlerType(handler)

        console.log('evt', header.name)

        this.subscriber.on(header.name, (event:cote.Event & Record<string, any> & {__header?:Header}) => {

            const pack = new Package(
                header.name,
                clearPackageData(event),
                event.__header ?? null
            )

            //
            // executo o handler
            const executor = new MicroserviceHandlerExecutor( pack)
            executor.handle(handler)

        })

    }

    //
    //
    //

}
