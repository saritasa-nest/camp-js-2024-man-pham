/** Subscriber interface. */
export type Subscriber<T> = {
	/**
	 * @param message The data that the subscriber needs to update.
	 */
	update(message: T): void;
};
