import { MicroserviceParams } from "../../Types";

export function CoteJSBaseConfiguration(params:MicroserviceParams) : [any, any]{

    return [
        {
            'name': params.name,
            'key': params.key,
        },
        {
            'log':false,
            'hello_logs_enabled': false,
            'status_logs_enabled':false,
            'redis': (
                params.redis_url || params.redis_host ? 
                    {
                        'url': params.redis_url,
                        'port': params.redis_port,
                        'host': params.redis_host,
                    }
                    :
                    undefined
            )
        }
    ]

}
