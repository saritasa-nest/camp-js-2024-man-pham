type Subscriber<T> = {
	update(message: T): void;
};

class Publisher<T> {
	private subscribers: Subscriber<T>[] = [];

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

	protected subscribersCount(): number {
		return this.subscribers.length;
	}

	public notify(message: T): void {
		this.subscribers.forEach(subcriber => subcriber.update(message));
	}

	private getSubscriberIndex(subscriber: Subscriber<T>): number {
		return this.subscribers.findIndex(sub => sub === subscriber);
	}
}

class PlayerTurnResult {
	public constructor(public playerIndex: number, public diceResult: number) {}
}

class DiceGenerator extends Publisher<number> {
	private sidesCount: number;

	private constructor(sidesCount: number) {
		super();
		this.sidesCount = sidesCount;
	}

	public roll(): number {
		const diceResult = Math.floor(Math.random() * this.sidesCount) + 1;
		this.notify(diceResult);

	}
}

class TurnGenerator extends Publisher<PlayerTurnResult> implements Subscriber<number> {
	private currentPlayerIndex = 0;

	public update(diceResult: number): void {
		const turnResult = new PlayerTurnResult(this.currentPlayerIndex, diceResult);
		this.notify(turnResult);
		this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.subscribersCount();
	}
}

class Player implements Subscriber<PlayerTurnResult> {
	private diceResult: number[] = [];

	public result: Publisher<number[]> = new Publisher<number[]>();

	public winStatus: Publisher<boolean> = new Publisher<boolean>();

}
