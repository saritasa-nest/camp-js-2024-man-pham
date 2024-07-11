import { Subscriber } from "./Subscriber";

/** Publisher class. */
export class Publisher<T> {
	private subscribers: Subscriber<T>[] = [];

	/**
	 * @param subscriber The one who subscribe to the publisher.
	 */
	public subscribe(subscriber: Subscriber<T>): void {
		const subcriberIndex = this.getSubscriberIndex(subscriber);
		if (subcriberIndex === -1) {
			this.subscribers.push(subscriber);
		}
	}

	/**
	 * @param subscriber The subscriber needs to be remove.
	 */
	public unsubscribe(subscriber: Subscriber<T>): void {
		const subcriberIndex = this.getSubscriberIndex(subscriber);
		if (subcriberIndex !== -1) {
			this.subscribers.splice(subcriberIndex, 1);
		}
	}

	/**
	 * Notify to the subscribers when there subcribed data has some changes.
	 * @param message The data which is send to the subscribers.
	 */
	public notify(message: T): void {
		this.subscribers.forEach(subcriber => subcriber.update(message));
	}

	/**
	 * Get the current subscriber position.
	 * @param subscriber The chosen subscriber.
	 */
	private getSubscriberIndex(subscriber: Subscriber<T>): number {
		return this.subscribers.findIndex(sub => sub === subscriber);
	}
}
