import { EventListener } from "./EventListener"

export class EventListenerPipe<T extends TipoDeEvento>{

    protected filters:Array<any> = []
    protected callback?:(data:any) => void

    constructor(
        protected eventListener:EventListener,
        protected event:T
    ){
        console.log('awaiting for events', event)
        this.eventListener.addEventListener(event as any, (data:any) => this.execute(data))
    }

    protected execute(data:any){

        console.log('event received', this.event)
        console.log('doing filtes', this.filters.length)

        let retorno

        for (const filter of this.filters) {

            const passed = filter(data)
            console.log('> apply filtro - passou ? ', passed)

            //
            // se não passou quebro o for
            if( !passed ){
                retorno = null
                break
            }

        }

        if( retorno !== null && this.callback){
            this.callback(data)
        }

    }

    filter(filter:(value:any) => boolean){
        this.filters.push(filter)
        return this
    }

    then( callback:(data:any) => void ){
        this.callback = callback
    }

}

type TipoDeEvento = string|any

