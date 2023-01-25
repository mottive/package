import { types } from "@mottive/engine";
import { IMessage } from "./IMessage";

export interface IEvent<Input extends types.Schema> extends IMessage<Input>{
}
