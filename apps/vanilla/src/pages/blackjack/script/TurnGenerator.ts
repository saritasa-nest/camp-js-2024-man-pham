import { Publisher, Subscriber } from './pattern';
import { DiceGenerator } from './DiceGenerator';

export class PlayerTurnResult {
	public constructor(public playerIndex: number, public diceResult: number) {}
}

export class TurnGenerator extends Publisher<PlayerTurnResult> implements Subscriber<number> {
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
