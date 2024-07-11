import { Subscriber } from "../models";

/**
 * Used to prepresent the data for the displayers to render.
 */
export class ResultData {
	public constructor(public dicesOrder: number[], public totalScore: number) {}
}

/**
 * The Displayer class which used to display the attender's information in the game.
 */
class Displayer {
	/**
	 * The element which wrap the attender's related HTML elements. */
	protected containerElement: HTMLElement | null = null;

	public constructor(name: string) {
		this.containerElement = document.getElementById(name);
	}
}

/**
 * The displayer to display the attender's result (the list of the dices, the total value of the dices).
 */
export class ResultDisplayer extends Displayer implements Subscriber<ResultData> {
	private readonly resultElement: HTMLElement;

	private readonly totalScoreElement: HTMLElement;

	public constructor(name: string) {
		super(name);

		this.containerElement = document.createElement("div");
		this.containerElement.id = name;
		this.containerElement.classList.add("displayer");

		const wrapper = document.getElementById("wrapper");
		if (this.containerElement) {
			wrapper?.appendChild(this.containerElement);
		}

		this.resultElement = document.createElement("div");
		this.totalScoreElement = document.createElement("span");

		const heading = document.createElement("h2");
		heading.textContent = name;
		heading.appendChild(this.totalScoreElement);

		this.containerElement?.appendChild(heading);
		this.containerElement?.appendChild(this.resultElement);
	}

	/**
	 * Update the attender's information.
	 * @param data The newly updated data.
	 */
	private render(data: ResultData): void {
		if (this.resultElement) {
			this.resultElement.innerText = `${data.dicesOrder.join(", ")}`;
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
		this.render({ ...resultData });
	}
}

/**
 * The displayer used to announce the player who wins the game.
 */
export class WinStatusDisplayer extends Displayer implements Subscriber<boolean> {
	public constructor(name: string) {
		super(name);
	}

	/**
	 * Peform actions to show the winner.
	 * @param winStatus The winning status of the specific player.
	 */
	public update(winStatus: boolean): void {
		if (winStatus) {
			this.containerElement?.classList.add("win");
			(document.getElementById("button-roll") as HTMLButtonElement).disabled = true;
		}
	}
}
