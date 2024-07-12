import { Publisher, Subscriber } from '../models';

import { DiceGenerator } from './dice-generator';

/** The class which contain the result after the dice is rolled. */
export class PlayerTurnResult {
	public constructor(public playerIndex: number, public diceResult: number) {}
}

/** The class that control the game (get the result from the dice and announce it to the players). */
export class TurnGenerator extends Publisher<PlayerTurnResult> implements Subscriber<number> {
	private currentPlayerIndex = 0;

	public constructor(private playerCount: number) {
		super();
	}

	/**
	 * Advances the turn to the next player in the game.
	 *
	 * This method increments the current player's index by one, and then
	 * uses the modulo operator to wrap around to the first player if the
	 * end of the player list is reached.
	 */
	private moveToNextPlayer(): void {
		this.currentPlayerIndex = (this.currentPlayerIndex + 1) % this.playerCount;
	}

	/**
	 * Send the dice result to the players.
	 * @param diceResult The value of the dice after being rolled.
	 */
	public update(diceResult: number): void {
		const turnResult = new PlayerTurnResult(this.currentPlayerIndex, diceResult);
		this.notify(turnResult);
		this.moveToNextPlayer();
	}

	/** Perform the rolling action for the next player. */
	public next(): void {
		DiceGenerator.getInstance().roll();
	}
}
