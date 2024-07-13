import { Subscriber } from './subscriber';

/** Publisher class. */
export class Publisher<T> {
	private readonly subscribers: Subscriber<T>[] = [];

	/**
	 * Add a subscriber to the list of subscriber.
	 * @param subscriber The one who subscribe to the publisher.
	 */
	public subscribe(subscriber: Subscriber<T>): void {
		const subscriberIndex = this.getSubscriberIndex(subscriber);
		if (subscriberIndex === -1) {
			this.subscribers.push(subscriber);
		}
	}

	/**
	 * Remove a subscriber from the list.
	 * @param subscriber The subscriber needs to be remove.
	 */
	public unsubscribe(subscriber: Subscriber<T>): void {
		const subscriberIndex = this.getSubscriberIndex(subscriber);
		if (subscriberIndex !== -1) {
			this.subscribers.splice(subscriberIndex, 1);
		}
	}

	/**
	 * Notify to the subscribers when there subscribed data has some changes.
	 * @param message The data which is send to the subscribers.
	 */
	public notify(message: T): void {
		this.subscribers.forEach(subscriber => subscriber.update(message));
	}

	/**
	 * Get the current subscriber position.
	 * @param subscriber The chosen subscriber.
	 */
	private getSubscriberIndex(subscriber: Subscriber<T>): number {
		return this.subscribers.findIndex(sub => sub === subscriber);
	}
}
