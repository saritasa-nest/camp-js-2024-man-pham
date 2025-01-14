import { Subscriber, Publisher } from '../models';

import { Attendee } from './attendee';
import { ResultData } from './displayers';
import { PlayerTurnResult } from './turn-generator';

const WIN_SCORE = 21;

/** The Player class which inherits from the Attender class. */
export class Player extends Attendee implements Subscriber<PlayerTurnResult> {
	private playerIndex: number;

	/** Use to announce to the displayer that the player has won. */
	public readonly winStatus: Publisher<boolean> = new Publisher<boolean>();

	public constructor(playerIndex: number) {
		super();
		this.playerIndex = playerIndex;
	}

	/**
	 * Perform an update to the player's dice results if it's the player's turn.
	 * @param turnResult The result which contains the current player index and the result of a roll.
	 */
	public update(turnResult: PlayerTurnResult): void {
		if (turnResult.playerIndex === this.playerIndex) {
			this.updateDicesList(turnResult);
			const resultData: ResultData = {
				dicesOrder: this.diceResults,
				totalScore: this.totalScore,
			};
			this.result.notify(resultData);
		}
		if (this.totalScore >= WIN_SCORE) {
			this.winStatus.notify(true);
		}
	}
}
