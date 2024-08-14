import { ApiErrorDto } from './api-error';

/** API error DTO. */
export type ApiErrorResponseDto = {

	/** Type. */
	readonly type: string;

	/** Error details. */
	readonly errors: readonly ApiErrorDto[];
};
