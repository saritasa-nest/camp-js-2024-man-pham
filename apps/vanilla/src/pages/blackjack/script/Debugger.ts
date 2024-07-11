import { Attender } from "./Attender";
import { ResultData } from "./Displayers";
import { Subscriber } from "../models";
import { PlayerTurnResult } from "./TurnGenerator";

/**
 * The Debugger class which tracks the whole game.
 */
export class Debbuger extends Attender implements Subscriber<PlayerTurnResult> {
	/**
	 * Save the dice results and the total value of all the dices.
	 * @param playerDiceResult The result which contains the current player index and the result of a roll.
	 */
	public update(playerDiceResult: PlayerTurnResult): void {
		this.updateDicesList(playerDiceResult);
		this.result.notify(new ResultData(this.diceResults, this.totalScore));
	}
}
