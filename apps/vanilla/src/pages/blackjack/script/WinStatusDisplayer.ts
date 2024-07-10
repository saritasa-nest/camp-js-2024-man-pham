import { Subscriber } from './pattern';

export class WinStatusDisplayer implements Subscriber<boolean> {
	public constructor(private resultElement: HTMLElement | null) {}

	update(winStatus: boolean) {
		if (winStatus && this.resultElement) {
			this.resultElement.classList.add(`win`);
		}
	}
}
