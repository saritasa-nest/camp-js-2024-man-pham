import { Subscriber } from './pattern';

export class ResultDisplayer implements Subscriber<number[]> {
	private allDiceResult: number[] = [];

	private log() {
		console.log(this.allDiceResult);
	}

	update(diceResult: number[]): void {
		this.allDiceResult.push(...diceResult);
		this.log();
	}
}
