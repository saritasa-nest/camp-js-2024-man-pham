type Subscriber<T> = {
	update(message: T): void;
};

class Publisher<T> {
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

class PlayerTurnResult {
	public constructor(public playerIndex: number, public diceResult: number) {}
}

class DiceGenerator extends Publisher<number> {
	private sidesCount: number;
	private static instance: DiceGenerator;

	private constructor(sidesCount: number) {
		super();
		this.sidesCount = sidesCount;
	}

	public static getInstance() {
		if (DiceGenerator.instance == null) {
			DiceGenerator.instance = new DiceGenerator(6);
		}
		return DiceGenerator.instance;
	}

	public roll(): void {
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

	public next() {
		DiceGenerator.getInstance().roll();
	}
}

class Player implements Subscriber<PlayerTurnResult> {
	private diceResult: number[] = [];
	public result: Publisher<number[]> = new Publisher<number[]>();
	public winStatus: Publisher<boolean> = new Publisher<boolean>();

	public constructor(private playerIndex: number) {}

	private calculateTotalDice = (): number => {
		return this.diceResult.reduce((result, current) => result + current, 0);
	};

	update(turnResult: PlayerTurnResult) {
		if (turnResult.playerIndex === this.playerIndex) this.diceResult.push(turnResult.diceResult);
		this.result.notify([turnResult.diceResult]);
		const totalDiceResult = this.calculateTotalDice();
		if (totalDiceResult >= 21) {
			this.winStatus.notify(true);
		}
	}
}

class ResultDisplayer implements Subscriber<number[]> {
	private allDiceResult: number[] = [];

	private log() {
		console.log(this.allDiceResult);
	}

	update(diceResult: number[]): void {
		this.allDiceResult.push(...diceResult);
		this.log();
	}
}
