import { Subscriber, Publisher } from './pattern';
import { PlayerTurnResult } from './TurnGenerator';

export class Player implements Subscriber<PlayerTurnResult> {
	private diceResult: number[] = [];
	private totalScore: number = 0;

	public result: Publisher<number[]> = new Publisher<number[]>();
	public winStatus: Publisher<boolean> = new Publisher<boolean>();

	public constructor(private playerIndex: number) {}

	private calculateTotalDice = (): void => {
		this.totalScore = this.diceResult.reduce((result, current) => result + current, 0);
	};

	update(turnResult: PlayerTurnResult) {
		if (turnResult.playerIndex === this.playerIndex) {
			this.diceResult.push(turnResult.diceResult);
			this.calculateTotalDice();
		}
		this.result.notify(this.diceResult);
		if (this.totalScore >= 21) {
			this.winStatus.notify(true);
		}
	}
}
