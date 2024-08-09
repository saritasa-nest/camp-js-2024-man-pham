import { Immerable, OmitImmerable } from './immerable';

/** User secret. */
export class UserSecret extends Immerable {

	/** Access token. */
	public readonly token: string;

	public constructor(data: TUserSecret) {
		super();
		this.token = data.token;
	}
}

type TUserSecret = OmitImmerable<UserSecret>;
