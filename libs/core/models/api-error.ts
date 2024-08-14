import { Immerable, OmitImmerable } from './immerable';

/** Details of an API error. */
export class ApiError extends Immerable {

	/** Detailed error message. */
	public readonly detail: string;

	/** Attribute associated with the error (can be null). */
	public readonly attr: string | null;

	public constructor(data: TApiError) {
		super();
		this.detail = data.detail;
		this.attr = data.attr;
	}
}

type TApiError = OmitImmerable<ApiError>;
