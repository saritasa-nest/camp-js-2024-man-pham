import { ApiErrorDto } from './api-error.dto';

/** API error DTO. */
export type ApiErrorResponseDto = {

	/** Type. */
	readonly type: string;

	/** Error details. */
	readonly errors: readonly ApiErrorDto[];
};
