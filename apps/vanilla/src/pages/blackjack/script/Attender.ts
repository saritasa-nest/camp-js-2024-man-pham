import { Publisher, Subscriber } from './pattern';
import { ResultData } from './ResultDisplayer';
import { PlayerTurnResult } from './TurnGenerator';

export class Attender implements Subscriber<PlayerTurnResult> {
	protected diceResults: number[] = [];
	protected totalScore: number = 0;

	public result: Publisher<ResultData> = new Publisher<ResultData>();

	protected calculateResult(turnResult: PlayerTurnResult): void {
		this.diceResults.push(turnResult.diceResult);
		this.totalScore = this.diceResults.reduce((result, current) => result + current, 0);
	}

	update(message: PlayerTurnResult): void {}
}
