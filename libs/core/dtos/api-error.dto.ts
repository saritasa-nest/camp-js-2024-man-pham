/** Api error DTO. */
export type ApiErrorDto = {

	/** Code. */
	readonly code: string;

	/** Detail. */
	readonly detail: string;

	/** Attribute. */
	readonly attr: string | null;
};
