import { Subscriber } from './pattern';

export class ResultDisplayer implements Subscriber<number[]> {
	private allDiceResult: number[] = [];

	public constructor(private element: HTMLElement | null) {}

	private render() {
		if (this.element) this.element.innerText = `${this.allDiceResult.join(', ')}`;
	}

	update(diceResult: number[]): void {
		this.allDiceResult.push(...diceResult);
		this.render();
	}
}
