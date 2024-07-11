import { Subscriber, Publisher } from './pattern';
import { ResultData, ResultDisplayer } from './ResultDisplayer';
import { PlayerTurnResult } from './TurnGenerator';

export class Player implements Subscriber<PlayerTurnResult> {
	private diceResult: number[] = [];
	private totalScore: number = 0;

	public result: Publisher<ResultData> = new Publisher<ResultData>();
	public winStatus: Publisher<boolean> = new Publisher<boolean>();

	public constructor(private playerIndex: number) {}

	private calculateTotalDice = (): void => {
		this.totalScore = this.diceResult.reduce((result, current) => result + current, 0);
	};

	update(turnResult: PlayerTurnResult) {
		if (turnResult.playerIndex === this.playerIndex) {
			this.diceResult.push(turnResult.diceResult);
			this.calculateTotalDice();
			this.result.notify(new ResultData(this.diceResult, this.totalScore));
		}
		if (this.totalScore >= 21) {
			this.winStatus.notify(true);
		}
	}
}
