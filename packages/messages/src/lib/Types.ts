import { types } from "@mottive/engine"
import { Message } from "./class/message/Message"

export type MicroserviceParams = {
    key:string,
    name:string,
    redis_url?:string,
    redis_port?:string,
    redis_host?:string,
}

export type MessageInput<T> = T extends Message<infer R> ? types.infer<R> : never
export type MessageOutput<T> = T extends Message<any, infer R> ? types.infer<R> : never
