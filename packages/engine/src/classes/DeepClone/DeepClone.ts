export class DeepClone{

    static clone(object:any){
        return JSON.parse(JSON.stringify(object))
    }

}
