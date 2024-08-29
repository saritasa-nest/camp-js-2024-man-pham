/**
 * Check if the given value is in enum.
 * @param e  Enum.
 * @param token Value.
 */
export function assertValueInEnum<T extends { [s: string]: unknown; }>(token: unknown, e: T): asserts token is T[keyof T] {
	if (Object.values(e).includes(token) === false) {
		throw Error('Value is not in Enum');
	}
}
