import { types } from "@mottive/engine"
import { MessageType } from "../../constants/MessageTypes"
import { ICommand } from "../../interfaces/ICommand"
import { Message } from "./Message"

export abstract class Command<
    Input extends types.ZodType = types.ZodType,
    Output extends types.ZodType = any
>
extends Message<Input, Output>
implements ICommand<Input, Output>{

    readonly type:MessageType = MessageType.Command

}
