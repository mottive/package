import * as types from "./index"

export function zodToArrayToObjectMap(object:types.ZodTypeAny){
    return fetchFirstLevel(object)
}

function fetchFirstLevel(object:types.ZodTypeAny){

    const typeName = object._def.typeName

    let data = []
  
    if( typeName === 'ZodObject' ){
  
        const nobject = (types.array(object) as types.ZodArray<types.ZodObject<any>>)._def.type.shape
        const shape = nobject._def.type.shape

        fetch(data, shape)

        return data
  
    }else if( typeName === 'ZodArray' ){
      
      const shape = object._def.type.shape
      fetch(data, shape)
      
      return data
  
    }else{
      return []
    }
  
}

function fetch(object:Array<any>, zodObject:types.ZodTypeAny){

    Object.keys(zodObject).forEach( key => {

        const property:types.ZodTypeAny = zodObject[key]
        const typeName:string = property._def.typeName

        if( typeName === 'ZodObject' ){

        const inner = {[key]:[]}
        object.push(inner)

        fetch(inner[key], property._def.shape())
        
        }else{
            object.push(key)
        }

    } )

}

//const final = group(rows, [
//  'id',
//  'nome',
//  'cidade',
//  {
//    'videogames': [
//      'videogame',
//      {
//        'jogos': 'jogo',
//      },
//    ]
//  },
//]);