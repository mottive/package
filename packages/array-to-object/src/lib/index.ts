import { Groupper } from './classes/groupper'
import { Ungroupper } from './classes/ungroupper'
import { Map } from './types/types'

export function arrayToObject<T = any, O extends Array<any> = Array<any>>(array:Array<T>, map:Map) : O {

    const groupper = new Groupper(array, map)
    const array_groupped = groupper.make()

    const ungroupper = new Ungroupper(array_groupped, map)
    
    return ungroupper.run() as any

}