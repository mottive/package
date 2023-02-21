import { TipoDeArquivo, TipoDeBase, TipoDeExportacao } from "../enums/enums"

export class Configuration{

    constructor(
        protected config:{
            tipo_arquivo?:TipoDeArquivo,
            tipo_base?:TipoDeBase,
            nome_arquivos_base?:string,
            pasta_arquivos_base?:string,
            tipo_exportacao?:TipoDeExportacao,
            pasta_exportacao?:string,
            pasta_exportacao_mirror?:string,
        }
    ){

    }

    execute(){
        console.log('executing')
    }

}