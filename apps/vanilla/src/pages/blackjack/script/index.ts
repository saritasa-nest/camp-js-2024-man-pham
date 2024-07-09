type Subscriber<T> = {
	update(message: T): void;
};

class Publisher<T> {
	private readonly subscribers: Subscriber<T>[] = [];

	public subscribe(subscriber: Subscriber<T>): void {
		const subIdx = this.getSubscriberIndex(subscriber);
		if (subIdx === -1) {
			this.subscribers.push(subscriber);
		}
	}

	public unsubscribe(subscriber: Subscriber<T>): void {
		const subIdx = this.getSubscriberIndex(subscriber);
		if (subIdx !== -1) {
			this.subscribers.splice(subIdx, 1);
		}
	}

	public notify(message: T): void {
		this.subscribers.forEach(subcriber => subcriber.update(message));
	}

	private getSubscriberIndex(subscriber: Subscriber<T>): number {
		return this.subscribers.findIndex(sub => sub === subscriber);
	}
}

class DiceGenerator extends Publisher<number> {
	private sidesCount: number;

	private constructor(sidesCount: number) {
		super();
		this.sidesCount = sidesCount;
	}

	roll(): number {
		return Math.floor(Math.random() * this.sidesCount) + 1;
	}
}
