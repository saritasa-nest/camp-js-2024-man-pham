/** Api error DTO. */
export type ApiErrorDto = {

	/** Code. */
	readonly code: string;

	/** Detailed message. */
	readonly detail: string;

	/** Attribute. */
	readonly attr: string | null;
};
