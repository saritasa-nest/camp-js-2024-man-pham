import { ApiError } from './api-error';
import { Immerable, OmitImmerable } from './immerable';

/** API error response. */
export class ApiErrorResponse extends Immerable {

	/** Array of error details. */
	public readonly errors: ApiError[];

	public constructor(data: TApiErrorResponse) {
		super();
		this.errors = data.errors;
	}
}

type TApiErrorResponse = OmitImmerable<ApiErrorResponse>;

/** The API response which implements Error interface. */
export class ApiErrorResponseWithDetails extends ApiErrorResponse implements Error {

	/** Error name. */
	public readonly name: string;

	/** Error message. */
	public readonly message: string;

	public constructor(data: TApiErrorResponse, message?: string) {
		super(data);
		this.name = 'ExtendedApiError';
		this.message = message ?? 'An API error occurred';
	}
}
