import * as dayjs from 'dayjs'

export class Parser{

    static toArray<T>( value:T ) : T extends Array<infer U> ? T : Array<T>{

        if( Array.isArray(value) ){
            return value as any
        }else{
            return [value] as any
        }

    }

    static toInt( value:any ) : number{

        switch( typeof value ){
            case 'string':
                return parseInt(value)
            default:
                return value as number
        }

    }

    static toNumber( value:any ) : number{

        switch( typeof value ){
            case 'string':
                return parseFloat(value)
            default:
                return value as number
        }

    }

    static toDate( value:any ) : Date{

        switch( typeof value ){
            case 'string':
                return dayjs(value).toDate()
            default:
                return value as Date
        }

    }

}
