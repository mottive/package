import { Type } from "@mottive/engine";
import { IHandler } from "../../interfaces/IHandler";
import { Message } from "../message/Message";

export abstract class Handler<T extends Message> extends IHandler<T>{
    abstract override message:Type<T>
    abstract override handle() : void
}
