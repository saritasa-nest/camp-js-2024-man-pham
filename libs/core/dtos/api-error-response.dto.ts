import { ApiErrorDto } from './api-error.dto';

/** API error DTO. */
export type ApiErrorResponseDto = {

	/** Type. */
	readonly type: string;

	/** List of api errors. */
	readonly errors: readonly ApiErrorDto[];
};
