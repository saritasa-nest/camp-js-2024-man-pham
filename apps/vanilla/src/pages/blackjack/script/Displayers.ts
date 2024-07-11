import { Subscriber } from './pattern';

export class ResultData {
	constructor(public dicesOrder: number[], public totalScore: number) {}
}

class Displayer<T> implements Subscriber<T> {
	protected containerElement: HTMLElement | null = null;

	public constructor(name: string) {
		this.containerElement = document.createElement('div');
		this.containerElement.id = name;
		this.containerElement.classList.add('displayer');
	}

	update(message: T): void {}
}

export class ResultDisplayer extends Displayer<ResultData> {
	private resultElement: HTMLElement;
	private totalScoreElement: HTMLElement;

	public constructor(name: string) {
		super(name);
		const wrapper = document.getElementById('wrapper');
		if (this.containerElement) wrapper?.appendChild(this.containerElement);

		document.createElement('div').classList.add('displayer');
		this.resultElement = document.createElement('div');
		this.totalScoreElement = document.createElement('span');

		const heading = document.createElement('h2');
		heading.textContent = name;
		heading.appendChild(this.totalScoreElement);

		this.containerElement?.appendChild(heading);
		this.containerElement?.appendChild(this.resultElement);
	}

	private render(data: ResultData) {
		if (this.resultElement) this.resultElement.innerText = `${data.dicesOrder.join(', ')}`;
		if (this.totalScoreElement) this.totalScoreElement.innerText = ` - ${data.totalScore}`;
	}

	override update(resultData: ResultData): void {
		this.render({ ...resultData });
	}
}
