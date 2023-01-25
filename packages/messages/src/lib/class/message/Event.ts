import { types } from "@mottive/engine"
import { MessageType } from "../../constants/MessageTypes"
import { IEvent } from "../../interfaces/IEvent"
import { Command } from "./Command"

export abstract class Event<
    Input extends types.ZodType = types.ZodType
>
extends Command<Input>
implements IEvent<Input>
{
    override readonly type:MessageType = MessageType.Event
}
