import { Message, MessageInput } from "@mottive/messages";
import { EventListener, Type } from "@mottive/engine";
import { messageOfType } from "../../script/functions";

export class EventPipe<T extends Message<any>>{

    protected stack:Array<(...args:any) => any> = []
    protected callback?:(data:MessageInput<T>) => void

    constructor(
        readonly eventListener:EventListener,
        readonly watchMessage:Type<T>
    ){
    }

    filter(callback:(data:MessageInput<T>) => boolean){
        this.stack.push(callback)
        return this
    }

    once(){
        // @todo
    }

    then(callback:(data:MessageInput<T>) => void){
        this.callback = callback
        this.registerEventListener()
    }

    protected registerEventListener(){

        this.eventListener.addEventListener(messageOfType(this.watchMessage).name, (data) => {

            let pass = true

            for (const lambda of this.stack) {

                const retorno = lambda(data)

                if( retorno === false ){
                    pass = false
                    break;
                }

            }

            if( pass && this.callback ){
                this.callback(data)
            }

        })

    }

}
