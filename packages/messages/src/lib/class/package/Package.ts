import { MessageInput } from "../../Types";
import { Message } from "../message/Message";

export class Package<T extends Message>{

    /**
     * Package é a classe responsável por compactar
     * todos os dados que são recebidos por um microservice
     *
     * Todo microservice quando 'exporta' as mensagens
     * recebidas irão enviar em formato Package
     */

    constructor(
        readonly type:string,
        readonly data:MessageInput<T>,
        readonly header:any = null
    ){

    }

}
