import { Package } from "@mottive/messages";
import { EventListener } from "@mottive/engine";
import { clearPackageData } from "../../script/clear-handler-data";

export abstract class EventReceiver{

    readonly events = new EventListener()

    //
    //
    //

    protected initializeOnAnyListener(receiver:{onAny:(callback:(event:string|string[], data:any) => void) => void}){

        //
        // funcão utilizada para podermos
        // fazer o listener interno dos eventos
        // disparados pelos microservicos

        receiver.onAny((event:string|string[], data) => {

            const events = []

            if( !Array.isArray(event) ){
                events.push(event)
            }

            events
                .filter(_event => !_event.startsWith('cote:')) // ignora eventos do cote
                .forEach(_event => {
                    this.onMessageReceived(new Package(_event, clearPackageData(data), data.__header))
                })

        })

    }

    protected async onMessageReceived(pack:Package<any>) : Promise<void> {
        this.events.trigger(pack.type, pack.data)
    }

    //
    //
    //

}
