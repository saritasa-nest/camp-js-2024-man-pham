export type Subscriber<T> = {
	update(message: T): void;
};

export class Publisher<T> {
	private subscribers: Subscriber<T>[] = [];

	public subscribe(subscriber: Subscriber<T>): void {
		const subcriberIndex = this.getSubscriberIndex(subscriber);
		if (subcriberIndex === -1) {
			this.subscribers.push(subscriber);
		}
	}

	public unsubscribe(subscriber: Subscriber<T>): void {
		const subcriberIndex = this.getSubscriberIndex(subscriber);
		if (subcriberIndex !== -1) {
			this.subscribers.splice(subcriberIndex, 1);
		}
	}

	protected subscribersCount(): number {
		return this.subscribers.length;
	}

	public notify(message: T): void {
		this.subscribers.forEach((subcriber) => subcriber.update(message));
	}

	private getSubscriberIndex(subscriber: Subscriber<T>): number {
		return this.subscribers.findIndex((sub) => sub === subscriber);
	}
}
