import { Attender } from './Attender';
import { ResultData } from './Displayers';
import { PlayerTurnResult } from './TurnGenerator';

/**
 * The Debugger class which tracks the whole game.
 */
export class Debbuger extends Attender {

	/**
	 * Save the dice results and the total value of all the dices.
	 * @param playerDiceResult The result which contains the current player index and the result of a roll.
	 */
	public override update(playerDiceResult: PlayerTurnResult): void {
		this.calculateResult(playerDiceResult);
		this.result.notify(new ResultData(this.diceResults, this.totalScore));
	}
}
