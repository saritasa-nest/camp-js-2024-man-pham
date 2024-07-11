import { Attender } from './Attender';
import { Publisher } from './pattern';
import { ResultData } from './Displayers';
import { PlayerTurnResult } from './TurnGenerator';

export class Player extends Attender {
	public winStatus: Publisher<boolean> = new Publisher<boolean>();

	public constructor(private playerIndex: number) {
		super();
	}

	override update(turnResult: PlayerTurnResult): void {
		if (turnResult.playerIndex === this.playerIndex) {
			this.calculateResult(turnResult);
			this.result.notify(new ResultData(this.diceResults, this.totalScore));
		}
		if (this.totalScore >= 21) {
			this.winStatus.notify(true);
		}
	}
}
