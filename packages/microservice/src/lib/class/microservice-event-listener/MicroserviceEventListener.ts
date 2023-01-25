import { Message } from "@mottive/messages";
import { EventListener, Type } from "@mottive/engine";
import { EventPipe } from "../event-pipe/event-pipe";

export class MicroserviceEventListener extends EventListener{

    pipe<T extends Message<any>>(message:Type<T>){
        return new EventPipe(this, message)
    }

}
