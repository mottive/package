import { GroupMap, Level, Map } from "../types/types"

export class Ungroupper{

  protected levels:Record<number, Record<string, boolean>> = {}
  protected dictionary:any = {}

  constructor(
    protected data:Record<string, any>,
    protected map:Map
  ){
  }

  unmake(){
    
    const set = []
    const level = this.fetchMapLevel(this.map)

    this.fetchObjectInRow(set, this.data, this.map, level.group)

    return set

  }

  fetchObjectInRow(resultSet:Array<any>, objectBase:Record<string, any>, map:Map, groups:GroupMap){

    const group = groups[0]
    const buffer = objectBase

    const items = this.fetchObjectsInGroup(buffer)

    for(let i = 0 ; i < items.length ; i++){
      
      const key = items[i]
      const item = buffer[key]

      if( groups.length > 1 ){
        this.fetchObjectInRow(resultSet, item, map, groups.slice(1))
      }else{

        const level = this.fetchMapLevel(map)
        const object = this.mountObjectByMap(item, level)
        resultSet.push(object)

        //
        // montaremos os agrupamentos nest do level agora
        for(let n = 0 ; n < level.nest.length ; n++){

          const nestKey = level.nest[n]
          const nestMap = this.findNestKeyMap(map, nestKey)
          const nestLevel = this.fetchMapLevel(nestMap)
          
          //
          // Monta as arrays
          this.fetchArrayInRow(
            nestLevel.array,
            object,
            nestKey,
            item[nestKey]
          )
  
          //
          // monta os grpos
          this.fetchObjectInRow( 
            object[nestKey], 
            item[nestKey], 
            nestMap, 
            nestLevel.group
          )

        }

      }

    }

  }

  fetchArrayInRow(arrays:Array<string>, object:any, key:string, data:any){

    for( let i = 0 ; i < arrays.length ; i++ ){
      const arrKey = arrays[i]
      object[key] = Array.from(data.values())
    }

  }

  findNestKeyMap(map:Map, nestkey:string) : Map {

    const objects = this.getNestedLevelsFromMap(map)

    for(let i = 0 ; i < objects.length ; i++ ){
      if( objects[i][nestkey] !== undefined ){
        return objects[i][nestkey]
      }
    }

    return []

  }

  getNestedLevelsFromMap(map:Map){
    return Array.isArray(map) ? map.filter(x => typeof x === 'object') : map
  }

  fetchObjectsInGroup(object:any){
    return Object.keys(object)
  }

  mountObjectByMap(object:any, level:Level){

    const data:any = {}

    level.group.forEach(key => { data[key] = object[key] ?? undefined } )
    level.nest.forEach(key => { data[key] = []} )

    return data
  }

  run(){
    return this.unmake()
  }

  fetchMapLevel(map:Map) : Level{

    const retorno:Level = {
      group:[],
      nest:[],
      array:[]
    }

    if( typeof map === 'string' ){
      retorno.array.push(map)
    }else{

      Object.keys(map).forEach(key => {

        const value = map[key]
        if( typeof value === 'string' ){
          retorno.group.push(value)
        }else{
          retorno.nest.push(...Object.keys(value))
        }
  
      })
  
    }

    return retorno
    
  }

}