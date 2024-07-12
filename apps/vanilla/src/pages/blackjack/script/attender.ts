import { Publisher } from '../models';

import { ResultData } from './displayers';
import { PlayerTurnResult } from './turn-generator';

/**  Attender class is used to represent the members that subscribed to the game (e.g players, debugger...). */
export class Attender {
	/** The array of the subscriber rolled dices. */
	protected diceResults: number[] = [];

	/** The result publisher for the displayers. */
	public readonly result: Publisher<ResultData> = new Publisher<ResultData>();

	/**
	 * @returns Return the current total score of the attender.
	 */
	protected get totalScore(): number {
		return this.diceResults.reduce((result, current) => result + current, 0);
	}

	/**
	 * Calculate the total value of the dice values.
	 * @param turnResult The result which contains the current player index and the result of a roll.
	 */
	protected updateDicesList(turnResult: PlayerTurnResult): void {
		this.diceResults.push(turnResult.diceResult);
	}
}
