type LessThan<N extends number, A extends number[] = []> = N extends A['length']
  ? A[number]
  : LessThan<N, [...A, A['length']]>;

/**
 * Enforces a numeric value within a given interval, specified by the type parameters.
 * Both boundaries are inclusive.
 *
 * @example
 * const a: NumericRange<0. 10> = 5 // OK
 * const b: NumericRange<0. 10> = 20 // ERROR
 */
export type NumericRange<F extends number, T extends number> = Exclude<T | LessThan<T>, LessThan<F>>;
