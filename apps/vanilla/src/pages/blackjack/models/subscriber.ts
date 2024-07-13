/** Subscriber interface. */
export type Subscriber<T> = {

	/**
	 * Perform actions upon receiving the new data.
	 * @param message The data that the subscriber needs to update.
	 */
	update(message: T): void;
};
