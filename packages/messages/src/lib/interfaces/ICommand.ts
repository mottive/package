import { types } from "@mottive/engine";
import { IMessage } from "./IMessage";

export interface ICommand<Input extends types.Schema, Output extends types.Schema = any> extends IMessage<Input, Output>{
}
