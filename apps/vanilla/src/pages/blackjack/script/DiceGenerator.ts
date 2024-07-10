import { Publisher } from './pattern';

export class DiceGenerator extends Publisher<number> {
	private sidesCount: number;
	private static instance: DiceGenerator;

	private constructor(sidesCount: number) {
		super();
		this.sidesCount = sidesCount;
	}

	public static getInstance() {
		if (DiceGenerator.instance == null) {
			DiceGenerator.instance = new DiceGenerator(6);
		}
		return DiceGenerator.instance;
	}

	public roll(): void {
		const diceResult = Math.floor(Math.random() * this.sidesCount) + 1;
		this.notify(diceResult);
	}
}
