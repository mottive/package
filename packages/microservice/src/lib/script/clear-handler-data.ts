import * as r from 'remeda'

export function clearPackageData(data:any){
    return r.omit(data, ['__header', 'type'])
}
