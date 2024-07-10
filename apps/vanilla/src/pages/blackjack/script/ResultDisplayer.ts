import { Subscriber } from './pattern';

export class ResultDisplayer implements Subscriber<number[]> {
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

	update(playerDiceResults: number[]): void {
		this.diceResults = playerDiceResults;
		this.calculateResult();
		this.render();
	}

	updateWinStatus(winStatus: boolean) {
		if (winStatus && this.resultElement && this.totalScoreElement) {
			this.resultElement.classList.add('win');
		}
	}
}
