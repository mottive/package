import { arrayToObject } from "@mottive/array-to-object";

type Map = string | Array<string | Record<string, any>>

export const group = function<T = any, O = any>(array:Array<T>|Record<string, any>, map:Map) : O {

    if( Array.isArray(array) ){
        return arrayToObject(array, map) as any
    }else{
        return arrayToObject([array], map).at(0)
    }

}