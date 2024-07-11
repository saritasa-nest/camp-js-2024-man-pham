import { Attender } from './Attender';
import { Publisher, Subscriber } from './pattern';
import { ResultData } from './Displayers';
import { PlayerTurnResult } from './TurnGenerator';

const WIN_SCORE = 21;

/**
 * The Player class which inherits from the Attender class.
 */
export class Player extends Attender implements Subscriber<PlayerTurnResult> {
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
	public update(turnResult: PlayerTurnResult): void {
		if (turnResult.playerIndex === this.playerIndex) {
			this.updateDicesList(turnResult);
			this.result.notify(new ResultData(this.diceResults, this.totalScore));
		}
		if (this.totalScore >= WIN_SCORE) {
			this.winStatus.notify(true);
		}
	}
}
