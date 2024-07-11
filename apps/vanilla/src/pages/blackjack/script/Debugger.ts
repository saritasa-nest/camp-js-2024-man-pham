import { Attender } from './Attender';
import { ResultData } from './Displayers';
import { PlayerTurnResult } from './TurnGenerator';

export class Debbuger extends Attender {
	override update(playerDiceResult: PlayerTurnResult): void {
		this.calculateResult(playerDiceResult);
		this.result.notify(new ResultData(this.diceResults, this.totalScore));
	}
}
