import { Subscriber } from './pattern';
import { PlayerTurnResult } from './TurnGenerator';

export class DebuggerDisplayer implements Subscriber<PlayerTurnResult> {
	private diceResults: number[] = [];
	private totalScore: number = 0;
	public constructor(private resultElement: HTMLElement | null, private totalScoreElement: HTMLElement | null) {}

	private render() {
		if (this.resultElement) this.resultElement.innerText = `${this.diceResults.join(', ')}`;
		if (this.totalScoreElement) this.totalScoreElement.innerText = ` - ${this.totalScore}`;
	}

	private calculateResult() {
		this.totalScore = this.diceResults.reduce((result, current) => result + current, 0);
	}

	update(playerDiceResult: PlayerTurnResult): void {
		this.diceResults.push(playerDiceResult.diceResult);
		this.calculateResult();
		this.render();
	}
}
