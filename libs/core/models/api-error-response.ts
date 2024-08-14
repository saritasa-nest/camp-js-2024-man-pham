import { ApiError } from './api-error';
import { Immerable, OmitImmerable } from './immerable';

/** API error. */
export class ApiErrorResponse extends Immerable {

	/** Array of error details. */
	public readonly errors: ApiError[];

	public constructor(data: TApiErrorResponse) {
		super();
		this.errors = data.errors;
	}
}

type TApiErrorResponse = OmitImmerable<ApiErrorResponse>;
