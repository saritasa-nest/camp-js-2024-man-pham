/**
 * Generates a random integer between 1 and the specified maximum (inclusive).
 * Uses the Web Cryptography API for secure random number generation.
 *
 * @param max - The maximum value (inclusive) for the random number.
 * @returns A random integer between 1 and `max`.
 */
export function getRandomIntegerNumber(max: number): number {
	const { crypto } = window ;
	const array = new Uint32Array(1);
	crypto.getRandomValues(array);

	return 1 + Math.floor(array[0] % max);
}
