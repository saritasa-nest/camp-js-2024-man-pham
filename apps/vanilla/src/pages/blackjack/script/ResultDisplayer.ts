import { Subscriber } from './pattern';

export class ResultData {
	constructor(public dicesOrder: number[], public totalScore: number) {}
}

export class ResultDisplayer implements Subscriber<ResultData> {
	public constructor(private resultElement: HTMLElement | null, private totalScoreElement: HTMLElement | null) {}

	private render(data: ResultData) {
		if (this.resultElement) this.resultElement.innerText = `${data.dicesOrder.join(', ')}`;
		if (this.totalScoreElement) this.totalScoreElement.innerText = ` - ${data.totalScore}`;
	}

	update(resultData: ResultData): void {
		this.render({ ...resultData });
	}
}
