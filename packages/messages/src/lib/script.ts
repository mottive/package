import { Type } from "@mottive/engine";
import { Handler } from "./class/handler/Handler";
import { Message } from "./class/message/Message";

export function handlerOf<T extends Handler<any>>(t:Type<T>) : T{
    return new t
}

export function headerOf<T extends Message>(t:Type<T>) : T{
    return new t
}

export function headerOfHandler<T extends Handler<any>>(t:Type<T>) : Message {
    return headerOf(handlerOf(t).message)
}
