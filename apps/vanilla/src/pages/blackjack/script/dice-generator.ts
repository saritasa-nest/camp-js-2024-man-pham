import { Publisher } from '../models';

const SIDES_COUNT = 6;

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
	 * @returns Return a instance of DiceGenerator.
	 */
	public static getInstance(): DiceGenerator {
		if (DiceGenerator.instance == null) {
			DiceGenerator.instance = new DiceGenerator(SIDES_COUNT);
		}
		return DiceGenerator.instance;
	}

	/** Roll the dice to return a score. */
	public roll(): void {
		const diceResult = Math.floor(Math.random() * this.sidesCount) + 1;
		this.notify(diceResult);
	}
}
