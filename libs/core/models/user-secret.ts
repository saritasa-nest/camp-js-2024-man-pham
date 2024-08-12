import { Immerable, OmitImmerable } from './immerable';

/** User secret. */
export class UserSecret extends Immerable {

	/** Access token. */
	public readonly accessToken: string;

	/** Refresh token. */
	public readonly refreshToken: string;

	public constructor(data: TUserSecret) {
		super();
		this.accessToken = data.accessToken;
		this.refreshToken = data.refreshToken;
	}
}

type TUserSecret = OmitImmerable<UserSecret>;
