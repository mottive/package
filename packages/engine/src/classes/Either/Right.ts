import { Either } from './Either';
import { Left } from './Left';

export class Right<L, A> {

    readonly value: A

    constructor(value: A) {
        this.value = value
    }

    isLeft(): this is Left<L, A> {
        return false
    }

    isRight(): this is Right<L, A> {
        return true
    }

}

export const right = <L, A>(a: A): Either<L, A> => {
    return new Right<L, A>(a)
}
