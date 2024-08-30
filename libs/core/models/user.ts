import { Immerable, OmitImmerable } from './immerable';

/** User data. */
export class User extends Immerable {

	/** Email. */
	public readonly email: string;

	/** First name. */
	public readonly firstName: string;

	/** Last name. */
	public readonly lastName: string;

	/** Avatar. */
	public readonly avatar: string;

	/** Created date. */
	public readonly createdAt: Date;

	/** Modified date. */
	public readonly modifiedAt: Date;

	public constructor(data: TUser) {
		super();
		this.email = data.email;
		this.firstName = data.firstName;
		this.lastName = data.lastName;
		this.avatar = data.avatar;
		this.createdAt = data.createdAt;
		this.modifiedAt = data.modifiedAt;
	}
}

type TUser = OmitImmerable<User>;
