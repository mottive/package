import { Command, Event, Handler, Header, Message, MessageInput, MessageOutput, MessageType } from "@mottive/messages"
import { Parser, Type, types } from "@mottive/engine"
import { messageOfHandlerType, messageOfType } from "../../script/functions"
import { MicroserviceParams } from "../../Types"
import { Client } from "../client/Client"
import { Emitter } from "../emitter/Emitter"
import { Listener } from "../listener/Listener"
import { MicroserviceEventListener } from "../microservice-event-listener/MicroserviceEventListener"
import { Server } from "../server/Server"

export class MicroserviceConfiguration{

    protected is:Record<MicroserviceTypes, boolean> = {
        'server': false,
        'client': false,
        'emitter': false,
        'listener': false,
    }

    protected server?:Server
    protected client?:Client
    protected listener?:Listener
    protected emitter?:Emitter
    protected message_map:Record<string, Array<any>> = {} // guarda a associacao deuma string com um handler

    readonly events = new MicroserviceEventListener()

    constructor(
        readonly params:MicroserviceParams,
    ){
    }

    //
    //
    //

    initialize(){

        console.log('init micro')

        if(this.is.server){
            this.server = new Server(this)
            this.events.connectToEventListener( this.server.events )
        }

        if(this.is.client){
            this.client = new Client(this)
        }

        if(this.is.listener){
            this.listener = new Listener(this)
            this.events.connectToEventListener( this.listener.events )
        }

        if(this.is.emitter){
            this.emitter = new Emitter(this)
        }

    }

    handle<T extends Message>(handler:Type<Handler<T>>){

        //
        // faco a associação da string com o handler
        if( !this.message_map[ messageOfHandlerType(handler).name ] ){
            this.message_map[ messageOfHandlerType(handler).name ] = []
        }

        this.message_map[ messageOfHandlerType(handler).name ].push(handler)

        //
        // disparo para o listener correto
        if( messageOfHandlerType(handler).type === MessageType.Command || messageOfHandlerType(handler).type === MessageType.Query ){
            this.listenToCommands(handler)
        }else if( messageOfHandlerType(handler).type === MessageType.Event ){
            this.listenToEvents(handler)
        }else if( messageOfHandlerType(handler).type === MessageType.View ){
            this.listenToCommands(handler)
        }else{
            throw 'unknown type of handler'
        }

    }

    sync<T extends Command>(message:Type<T>, payload:MessageInput<T>) : Promise<MessageOutput<T>> {

        return new Promise((resolve, reject) => {

            this.client?.sync(message, payload)
                .then(res => resolve(res))
                .catch(err => reject(err))

        })

    }

    /**
     * Registro os headers que podem ser usados no micrservice
     * com a função de validação dos tipos
     */
    registerMessages(type:Type<Message<any>>|Array<Type<Message<any>>>){

        const types = Array.isArray(type) ? type : [type]

        types.forEach(type => {

            if( !this.message_map[ messageOfType(type).name ] ){
                this.message_map[ messageOfType(type).name ] = []
            }

            this.message_map[ messageOfType(type).name ].push(type)

        })

        //console.log(Object.keys(this.message_map).sort())

    }

    async send(message:string, payload:MessageInput<any>, headers?:Header) : Promise<void>;
    async send<T extends Command>(message:Type<T>, payload:MessageInput<T>, headers?:Header) : Promise<void>;
    async send<T extends Command>(message:Type<T>|string, payload:MessageInput<T>, headers?:Header) : Promise<void>{

        if( !this.client ){
            console.log('🔴 microservice is not a client to send')
            return
        }

        if( typeof message === 'string' ){

            const types = this.message_map[message]

            if( !types ){
                console.warn('❌ handler nao encontrado para', message)
                console.log(this.message_map)
                console.log(types)
                return
            }

            for await (const type of types) {
                await this.client.send(type, payload, headers)
            }

        }else{
            await this.client.send(message, payload, headers)
        }

    }

        echo<T extends Event>(message:string, payload:MessageInput<any>, headers?:Header) : void;
        echo<T extends Event>(message:Type<T>, payload:MessageInput<T>, headers?:Header) : void;
        echo<T extends Event>(message:Type<T>|string, payload:MessageInput<T>, headers?:Header) : void {

        if( !this.emitter ){
            console.log('🔴 microservice is not a emitter to echo')
            return
        }

        if( typeof message === 'string' ){

            const types = this.message_map[message]

            if( !types ){
                console.warn('❌ handler nao encontrado para', message)
                return
            }

            for (const type of types) {
                this.emitter.echo(type, payload, headers)
            }

        }else{
            this.emitter.echo(message, payload, headers)
        }

    }

    //
    //
    //

    protected listenToCommands(handler:Type<Handler<any>>){

        if( !this.server ){
            console.log('🔴 microservice is not a server to listen')
            return
        }

        this.server.listen(handler)

    }


    protected listenToEvents(handler:Type<Handler<any>>){

        if( !this.listener ){
            console.log('🔴 microservice is not a listener to listen')
            return
        }

        this.listener.listen(handler)

    }

    //
    //
    //

    isServer(is:boolean = true){
        this.is['server'] = is
        return this
    }

    isClient(is:boolean = true){
        this.is['client'] = is
        return this
    }

    isEmitter(is:boolean = true){
        this.is['emitter'] = is
        return this
    }

    isListener(is:boolean = true){
        this.is['listener'] = is
        return this
    }

    //
    //
    //

}

type MicroserviceTypes = 'server' | 'client' | 'emitter' | 'listener'
