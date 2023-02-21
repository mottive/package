import { cancel, intro, outro, select, text, isCancel } from '@clack/prompts';
import { TipoDeArquivo, TipoDeBase, TipoDeExportacao } from './enums/enums';
import { Configuration } from './lib/ConfigurationGenerator';

function hello(){
    intro('🎉 Code Generator for @mottive projects')
}

async function main(){

    let tipo_arquivo:TipoDeArquivo | undefined = undefined
    let tipo_base:TipoDeBase | undefined = undefined
    let nome_arquivos_base:string | undefined = undefined
    let pasta_arquivos_base:string | undefined = undefined
    let tipo_exportacao:TipoDeExportacao | undefined = undefined
    let pasta_exportacao:string | undefined = undefined
    let pasta_exportacao_mirror:string | undefined = undefined

    const buffer_tipo_arquivo = await select({
        message: 'Qual tipo de arquivo gostaria de gerar ?',
        options: [
            { value: TipoDeArquivo.command, label: 'Command' },
            { value: TipoDeArquivo.event, label: 'Event' },
            { value: TipoDeArquivo.handler, label: 'Handler' },
            { value: TipoDeArquivo.service, label: 'Service' },
        ],
        initialValue: TipoDeArquivo.handler
    });

    if( isCancel(buffer_tipo_arquivo) ){
        return -1
    }else{
        tipo_arquivo = buffer_tipo_arquivo
    }
    
    //
    //
    //
    
    if( tipo_arquivo === TipoDeArquivo.handler || tipo_arquivo === TipoDeArquivo.service ){

        const buffer_tipo_base = await select({
            message: 'Qual a base de arquivos gostaria de usar ?',
            options: [
                { value: TipoDeBase.manual, label: 'Digitar o nome dos arquivos' },
                { value: TipoDeBase.messages, label: 'Utilizar arquivos de mensagens (extends Message)' },
            ],
        });
        
        if( isCancel(buffer_tipo_base) ){
            return -1
        }else{
            tipo_base = buffer_tipo_base
        }

    }
    
    //
    //
    //
    
    if( tipo_base !== undefined && tipo_base === TipoDeBase.manual ){

        const buffer_nome_arquivos_base = await text({
            message: 'Digite o nome das classes dos arquivos que voce gostaria de gerar separados por virgula e em camel case ?',
            placeholder: 'InserirLoremNoVault, ApagarComentarios, ExplodirOMundo',
        });
        
        if( isCancel(buffer_nome_arquivos_base) ){
            return -1
        }else{
            nome_arquivos_base = buffer_nome_arquivos_base
        }
        
    }

    //
    //
    //
    
    if( tipo_base === TipoDeBase.messages ){

        const buffer_pasta_arquivos_base = await text({
            message: 'Pasta dos arquivos das messages em formato blob',
            placeholder: '/var/teste/**/*.ts',
            initialValue: process.cwd(),
        });
        
        if( isCancel(buffer_pasta_arquivos_base) ){
            return -1
        }else{
            pasta_arquivos_base = buffer_pasta_arquivos_base
        }
    
    }

    //
    //
    //
    
    const buffer_tipo_exportacao = await select({
        message: 'Qual o metodo de exportacao ?',
        options: [
            { value: TipoDeExportacao.manual, label: 'Especificar as pastas de saída' },
            { value: TipoDeExportacao.mirror, label: 'Especificar uma pasta raiz e fazer um espelho dos arquivos base' },
        ],
    });
    
    if( isCancel(buffer_tipo_exportacao) ){
        return -1
    }else{
        tipo_exportacao = buffer_tipo_exportacao
    }

    //
    //
    //

    //
    //
    //
    
    const buffer_pasta_exportacao = await text({
        message: 'Pasta base arquivos de exportacao',
        placeholder: process.cwd(),
        initialValue: process.cwd(),
    });

    if( isCancel(buffer_pasta_exportacao) ){
        return -1
    }else{
        pasta_exportacao = buffer_pasta_exportacao
    }

    if( tipo_exportacao === TipoDeExportacao.mirror && tipo_base === TipoDeBase.messages ){

        const buffer_pasta_exportacao_mirror = await text({
            message: 'Especifique a pasta base de espelho',
        });
    
        if( isCancel(buffer_pasta_exportacao_mirror) ){
            return -1
        }else{
            pasta_exportacao_mirror = buffer_pasta_exportacao_mirror
        }
    
    }

    //
    //
    //
    
    const configuracao = new Configuration({
        'tipo_arquivo': tipo_arquivo,
        'tipo_base': tipo_base,
        'nome_arquivos_base': nome_arquivos_base,
        'pasta_arquivos_base': pasta_arquivos_base,
        'tipo_exportacao': tipo_exportacao,
        'pasta_exportacao': pasta_exportacao,
        'pasta_exportacao_mirror': pasta_exportacao_mirror
    })
    
    if( isCancel(buffer_tipo_arquivo) ){
        return -1
    }else{
        tipo_arquivo = buffer_tipo_arquivo
    }

    return configuracao

}

hello()
main()
    .then( async (retorno:Configuration|number) => {

        if( typeof retorno === 'number' ){
            cancel('Operation cancelled.')
        }else{
            await retorno.execute()
            outro(`You're all set!`)
        }

    })