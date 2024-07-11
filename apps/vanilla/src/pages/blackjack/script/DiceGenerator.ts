import { Publisher } from '../models';

/** The dice value generator. */
export class DiceGenerator extends Publisher<number> {
	private readonly sidesCount: number;

	private static instance: DiceGenerator;

	private constructor(sidesCount: number) {
		super();
		this.sidesCount = sidesCount;
	}

	/**
	 * Generate a dice.
	 * @param sidesCount The amount of the dice's side.
	 * @returns Return a instance of DiceGenerator.
	 */
	public static getInstance(sidesCount: number = 6): DiceGenerator {
		if (DiceGenerator.instance == null) {
			DiceGenerator.instance = new DiceGenerator(sidesCount);
		}
		return DiceGenerator.instance;
	}

	/** Roll the dice to return a score. */
	public roll(): void {
		const diceResult = Math.floor(Math.random() * this.sidesCount) + 1;
		this.notify(diceResult);
	}
}
