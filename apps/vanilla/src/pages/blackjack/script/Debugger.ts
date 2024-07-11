import { Publisher, Subscriber } from './pattern';
import { ResultData } from './ResultDisplayer';
import { PlayerTurnResult } from './TurnGenerator';

export class Debbuger implements Subscriber<PlayerTurnResult> {
	private diceResults: number[] = [];
	private totalScore: number = 0;

	public result: Publisher<ResultData> = new Publisher<ResultData>();

	private calculateResult() {
		this.totalScore = this.diceResults.reduce((result, current) => result + current, 0);
	}

	update(playerDiceResult: PlayerTurnResult): void {
		this.diceResults.push(playerDiceResult.diceResult);
		this.calculateResult();
		this.result.notify(new ResultData(this.diceResults, this.totalScore));
	}
}
