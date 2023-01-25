import { types } from "@mottive/engine"
import { MessageType } from "../constants/MessageTypes"

export interface IMessage<TInput extends types.ZodType, TOutput extends types.ZodType = any>{
    name:string
    type:MessageType
    version:number
    input:TInput
    output?:TOutput
}
