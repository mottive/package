import { EventEmitter2 } from "eventemitter2";

export class EventListener<TEvents extends EventList = any>{

    protected engine:EventEmitter2 = new EventEmitter2()

    //
    //
    //

    addEventListener<T extends keyof TEvents>(eventName:T, callback:(data:TEvents[T]) => void){
        this.engine.on(eventName as string, (data) => callback(data))
    }

    onAnyEvent(callback:(name:string|string[], data:any) => void){

        this.engine.onAny((event, value) => {
            callback(event, value)
        })

    }

    trigger<Key extends EventKeys<TEvents>>(event:EventKeys<TEvents>|any, data:TEvents[Key]){
        this.engine.emit(event as string, data)
    }

    connectToEventListener(eventListener:EventListener){

        eventListener.onAnyEvent((event, data) => {
            this.trigger(event, data)
        })

    }

}

type EventList = Record<string, any>
type EventKeys<TEventList extends EventList> = keyof TEventList
