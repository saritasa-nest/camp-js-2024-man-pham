import { Subscriber } from '../models';

import { Attender } from './attender';
import { ResultData } from './displayers';
import { PlayerTurnResult } from './turn-generator';

/** The Debugger class which tracks the whole game. */
export class Debugger extends Attender implements Subscriber<PlayerTurnResult> {
	/**
	 * Save the dice results and the total value of all the dices.
	 * @param playerTurnResult The result which contains the current player index and the result of a roll.
	 */
	public update(playerTurnResult: PlayerTurnResult): void {
		this.updateDicesList(playerTurnResult);
		const resultData: ResultData = {
			dicesOrder: this.diceResults,
			totalScore: this.totalScore,
		};
		this.result.notify(resultData);
	}
}
