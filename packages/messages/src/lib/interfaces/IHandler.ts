import { Type } from "@mottive/engine";
import { Message } from "../class/message/Message";
import { MessageInput } from "../Types";
import { IHandle } from "./IHandle";

export abstract class IHandler<T extends Message> extends IHandle<MessageInput<T>>{
    abstract readonly message:Type<T>
    abstract override handle() : void
}
