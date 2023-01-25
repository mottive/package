import { Either } from "./Either";
import { Right } from "./Right";

export class Left<L, A> {

    readonly value: L

    constructor(value: L) {
      this.value = value
    }

    isLeft(): this is Left<L, A> {
      return true
    }

    isRight(): this is Right<L, A> {
      return false
    }

}

export const left = <L, A>(l: L): Either<L, A> => {
    return new Left(l)
}
