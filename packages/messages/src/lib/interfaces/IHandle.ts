import { Header } from "../class/message/Header"

export abstract class IHandle<
    TInput extends Record<string, any> | string | boolean | number,
    TOutput extends Record<string, any> = any
>{

    constructor(
        readonly data:TInput,
        readonly header:Header = null
    ){
    }

    abstract handle() : TOutput

}

export type HandleInput<T> = T extends IHandle<infer R> ? R : T
export type HandleOutput<T> = T extends IHandle<any, infer R> ? R : T
