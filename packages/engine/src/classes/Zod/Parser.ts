import { z } from "zod";
import * as zod_validation_error from 'zod-validation-error';

class Parser{

    protected _sucess:boolean = false
    protected _error_message?:string
    protected _data:any

    constructor(
        protected readonly schema:z.Schema,
        protected readonly data:any,
    ){
        this.parse()
    }

    protected parse(){

        const result = this.schema.safeParse(this.data)

        if( result.success ){
            this._sucess = true
        }else{
            this._sucess = false
            this._error_message = zod_validation_error.fromZodError(result.error).message
        }

    }

    get success(){
        return this._sucess
    }

    get error(){
        return !this._sucess
    }

    get errorMessage(){
        //console.log(zodToJsonSchema(type.input))
        return this._error_message
    }

}

export function parse( schema:z.Schema, data:any ){
    return new Parser(schema, data)
}
