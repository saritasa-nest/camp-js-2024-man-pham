import { Immerable, OmitImmerable } from './immerable';

/** Registration data. */
export class Login extends Immerable {

	/** Email. */
	public readonly email: string;

	/** Password. */
	public readonly password: string;

	public constructor(data: TLogin) {
		super();
		this.email = data.email;
		this.password = data.password;
	}
}

type TLogin = OmitImmerable<Login>;
