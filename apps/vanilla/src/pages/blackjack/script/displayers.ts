import { Subscriber } from '../models';

/** Used to represent the data for the displayers to render. */
export class ResultData {
	public constructor(public dicesOrder: number[], public totalScore: number) {}
}

/** The Displayer class which used to display the attender's information in the game. */
class Displayer {
	/** The element which wrap the attender's related HTML elements. */
	protected containerElement: HTMLElement | null = null;

	public constructor(name: string) {
		this.containerElement = document.getElementById(name);
	}

	/**
	 * Generate the displayer's HTML elements.
	 * @param htmlString Is the string template for the element.
	 * @returns Return the element.
	 */
	protected createElement(htmlString: string): HTMLElement {
		const div = document.createElement('div');
		div.innerHTML = htmlString.trim();
		return div.firstChild as HTMLElement;
	}
}

/** The displayer to display the attender's result (the list of the dices, the total value of the dices). */
export class ResultDisplayer extends Displayer implements Subscriber<ResultData> {
	private readonly resultElement: HTMLElement | null = null;

	private readonly totalScoreElement: HTMLElement | null = null;

	public constructor(name: string) {
		super(name);

		this.containerElement = this.createResultDisplayerElement(name);

		const wrapper = document.getElementById('wrapper');
		if (this.containerElement) {
			wrapper?.appendChild(this.containerElement);
		}

		this.resultElement = document.getElementById(`${name}-dice-results`);
		this.totalScoreElement = document.getElementById(`${name}-score`);

	}

	private createResultDisplayerElement(name: string): HTMLElement {
		return this.createElement(
			`<article id="${name}" class="displayer">
			   	<div>
                	 <h2 class="displayer__heading">${name}
						<span id="${name}-score"></span>
					 </h2>
				</div>
				<div id="${name}-dice-results" class="displayer__dice-results"></div>
            </article>`,
		);
	}

	/**
	 * Update the attender's information.
	 * @param data The newly updated data.
	 */
	private renderNewResult(data: ResultData): void {
		if (this.resultElement) {
			this.resultElement.innerText = `${data.dicesOrder.join(', ')}`;
		}
		if (this.totalScoreElement) {
			this.totalScoreElement.innerText = ` - ${data.totalScore}`;
		}
	}

	/**
	 * Perform updating the data after being notified.
	 * @param resultData The data which is sent from the publisher (the attender).
	 */
	public update(resultData: ResultData): void {
		this.renderNewResult({ ...resultData });
	}
}

/** The displayer which is used to announce the player who wins the game. */
export class WinStatusDisplayer extends Displayer implements Subscriber<boolean> {
	public constructor(name: string) {
		super(name);
	}

	/**
	 * Perform actions to show the winner.
	 * @param winStatus The winning status of the specific player.
	 */
	public update(winStatus: boolean): void {
		if (winStatus) {
			this.containerElement?.classList.add('displayer_win');
			(document.getElementById('button-roll') as HTMLButtonElement).disabled = true;
			(document.getElementById('button-roll') as HTMLButtonElement).innerText = 'We have a winner 🥳';
		}
	}
}
