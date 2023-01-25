import { Handler, Message } from "@mottive/messages";
import { Type } from "@mottive/engine";

export function instance<T>(t:Type<T>) : T{
    return new t
}

export function handlerOf<T extends Handler<any>>(t:Type<T>) : T{
    return new t
}

export function messageOfType<T extends Message>(t:Type<T>) : T{
    return new t
}

export function messageOfHandlerType<T extends Handler<any>>(t:Type<T>) : Message {
    return messageOfType(handlerOf(t).message)
}
