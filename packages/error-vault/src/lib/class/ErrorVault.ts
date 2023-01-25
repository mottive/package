import { EventListener } from '@mottive/engine'

export class ErrorVault{

    protected static _instance?:ErrorVaultInstance

    //
    //
    //

    //protected constructor(){
    //
    //}

    //
    //
    //

    static instance() : ErrorVaultInstance {

        if( !ErrorVault._instance ){
            ErrorVault._instance = new ErrorVaultInstance()
        }

        return ErrorVault._instance

    }

}

class ErrorVaultInstance{

    readonly events = new EventListener<{
        error: any
    }>()

    add<T extends Error>(data:T|any){
        this.events.trigger('error', data)
    }

}
