import { Publisher, Subscriber } from './pattern';
import { ResultData } from './Displayers';
import { PlayerTurnResult } from './TurnGenerator';

/**
 * Attender class is used to prepresent the members that subscribed to the game (e.g players, debugger...).
 */
export class Attender implements Subscriber<PlayerTurnResult> {
	/**
	 * The array of the subscriber rolled dices.
	 */
	protected diceResults: number[] = [];

	/**
	 * The total amount of the dices value.
	 */
	protected totalScore = 0;

	/**
	 * The result publisher for the displayers.
	 */
	public result: Publisher<ResultData> = new Publisher<ResultData>();

	/**
	 * Calulate the total value of the dice values.
	 * @param turnResult The result which contains the current player index and the result of a roll.
	 */
	protected calculateResult(turnResult: PlayerTurnResult): void {
		this.diceResults.push(turnResult.diceResult);
		this.totalScore = this.diceResults.reduce((result, current) => result + current, 0);
	}

	/**
	 * A blank function which will be extended by the inherit classes.
	 * @param message The turn result of the player.
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-empty-function
	public update(message: PlayerTurnResult): void {}
}
