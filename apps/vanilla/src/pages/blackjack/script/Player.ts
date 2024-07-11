import { Attender } from './Attender';
import { Publisher } from './pattern';
import { ResultData } from './Displayers';
import { PlayerTurnResult } from './TurnGenerator';

/**
 * The Player class which inherits from the Attender class.
 */
export class Player extends Attender {
	/**
	 * Use to announce to the displayer that the player has won.
	 */
	public winStatus: Publisher<boolean> = new Publisher<boolean>();

	public constructor(private playerIndex: number) {
		super();
	}

	/**
	 * Perform an update to the player's dice results if it's the player's turn.
	 * @param turnResult The result which contains the current player index and the result of a roll.
	 */
	public override update(turnResult: PlayerTurnResult): void {
		if (turnResult.playerIndex === this.playerIndex) {
			this.calculateResult(turnResult);
			this.result.notify(new ResultData(this.diceResults, this.totalScore));
		}
		if (this.totalScore >= 21) {
			this.winStatus.notify(true);
		}
	}
}
