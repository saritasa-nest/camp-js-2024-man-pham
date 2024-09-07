/**
 * Convert enum to an array of objects.
 * @param enumObj Enum.
 * @returns Array of objects with key and values of the enum.
 */
export function convertEnumToArray<T extends object>(enumObj: T): { key: keyof T; value: T[keyof T]; }[] {
	return Object.keys(enumObj).map(key => ({
		key: key as keyof T,
		value: enumObj[key as keyof T],
	}));
}
