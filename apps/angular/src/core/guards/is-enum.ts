/**
 * Check if the given value is in enum.
 * @param e  Enum.
 * @param token Value.
 */
export function isEnum<T extends { [s: string]: unknown; }>(e: T, token: unknown): token is T[keyof T] {
	return Object.values(e).includes(token as T[keyof T]);
}
