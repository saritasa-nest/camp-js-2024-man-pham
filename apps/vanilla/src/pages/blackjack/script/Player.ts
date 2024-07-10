import { Subscriber, Publisher } from './pattern';
import { PlayerTurnResult } from './TurnGenerator';

export class Player implements Subscriber<PlayerTurnResult> {
	private diceResult: number[] = [];

	public result: Publisher<number[]> = new Publisher<number[]>();
	public winStatus: Publisher<boolean> = new Publisher<boolean>();

	public constructor(private playerIndex: number) {}

	private calculateTotalDice = (): number => {
		return this.diceResult.reduce((result, current) => result + current, 0);
	};

	update(turnResult: PlayerTurnResult) {
		if (turnResult.playerIndex === this.playerIndex) {
			this.diceResult.push(turnResult.diceResult);
		}

		this.result.notify(this.diceResult);

		const totalDiceResult = this.calculateTotalDice();
		if (totalDiceResult >= 21) {
			this.winStatus.notify(true);
		}
	}
}
