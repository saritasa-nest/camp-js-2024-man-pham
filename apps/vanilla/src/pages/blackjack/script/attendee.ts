import { Publisher } from '../models';

import { ResultData } from './displayers';
import { PlayerTurnResult } from './turn-generator';

/**  Attendee class is used to represent the members that subscribed to the game (e.g players, debugger...). */
export class Attendee {
	/** The array of the subscriber rolled dices. */
	protected readonly diceResults: number[] = [];

	/** The result publisher for the displayers. */
	public readonly result: Publisher<ResultData> = new Publisher<ResultData>();

	/**
	 * Get the total value of all of the attendee's dice results.
	 * @returns Return the current total score of the attender.
	 */
	protected get totalScore(): number {
		return this.diceResults.reduce((result, current) => result + current, 0);
	}

	/**
	 * Add a newly rolled dice value to the list.
	 * @param turnResult The result which contains the current player index and the result of a roll.
	 */
	protected updateDicesList(turnResult: PlayerTurnResult): void {
		this.diceResults.push(turnResult.diceResult);
	}
}
