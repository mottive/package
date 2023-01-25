import { Left } from "./Left";
import { Right } from "./Right";

export type Either<L, A> = Left<L, A> | Right<L, A>;
