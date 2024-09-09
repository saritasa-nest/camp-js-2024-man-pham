import { Immerable, OmitImmerable } from './immerable';

/** Api error. */
export class ApiError extends Immerable {

	/** Error detail. */
	public readonly detail: string;

	/** Attribute. */
	public readonly attr: string | null;

	public constructor(data: TApiError) {
		super();
		this.detail = data.detail;
		this.attr = data.attr;
	}
}

type TApiError = OmitImmerable<ApiError>;
