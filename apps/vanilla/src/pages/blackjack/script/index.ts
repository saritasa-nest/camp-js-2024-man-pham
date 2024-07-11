import { Debbuger } from './Debugger';
import { DiceGenerator } from './DiceGenerator';
import { ResultDisplayer, WinStatusDisplayer } from './Displayers';
import { Player } from './Player';
import { TurnGenerator } from './TurnGenerator';

/**
 * The Blackjack game application.
 */
class App {
	private playerCount = 2;

	private diceGenerator = DiceGenerator.getInstance();

	private turnGenerator: TurnGenerator;

	public constructor() {
		this.turnGenerator = new TurnGenerator(this.playerCount);

		const debbugerTool = new Debbuger();
		const debuggerDisplayer = new ResultDisplayer('debugger');
		debbugerTool.result.subscribe(debuggerDisplayer);

		const players = this.createPlayers();

		this.turnGenerator.subscribe(debbugerTool);
		players.forEach(player => {
			this.turnGenerator.subscribe(player);
		});

		this.diceGenerator.subscribe(this.turnGenerator);
	}

	private createPlayers(): Player[] {
		return Array(this.playerCount)
			.fill(null)
			.map((_, index) => {
				const player = new Player(index);
				const playerDisplayer = new ResultDisplayer(`player${index + 1}`);
				const playerWinStatusDisplayer = new WinStatusDisplayer(`player${index + 1}`);

				player.result.subscribe(playerDisplayer);
				player.winStatus.subscribe(playerWinStatusDisplayer);

				return player;
			});
	}

	/**
	 * Perform the actions for the next player.
	 */
	public roll(): void {
		this.turnGenerator.next();
	}
}

const app = new App();

window.onload = function() {
	const rollButton = document.getElementById('button-roll');
	if (rollButton) {
		rollButton.onclick = function() {
			app.roll();
		};
	}
};
