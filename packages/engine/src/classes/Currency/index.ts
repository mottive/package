import DineroFactory = require('dinero.js')

export const currency = (amount:number, options?:Omit<DineroFactory.Options, 'amount'>) => DineroFactory(Object.assign({}, {amount:amount}, options ?? {}))