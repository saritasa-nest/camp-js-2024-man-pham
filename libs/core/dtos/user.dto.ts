/** User DTO. */
export type UserDto = {

	/** Email. */
	readonly email: string;

	/** First name. */
	readonly first_name: string;

	/** Last name. */
	readonly last_name: string;

	/** Avatar. */
	readonly avatar: string | null;

	/** Created. */
	readonly created: string;

	/** Modified. */
	readonly modified: string;
};
