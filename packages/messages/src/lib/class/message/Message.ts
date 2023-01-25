import { types } from "@mottive/engine"
import { MessageType } from "../../constants/MessageTypes"
import { IMessage } from "../../interfaces/IMessage"

export abstract class Message<
    TInput extends types.ZodType = types.ZodType,
    TOutput extends types.ZodType = types.ZodType
> implements IMessage<TInput>{

    readonly version:number = 1

    readonly abstract name:string
    readonly abstract type:MessageType
    readonly abstract input:TInput
    readonly output?:TOutput

    constructor(readonly params:types.infer<TInput>){

    }

}
