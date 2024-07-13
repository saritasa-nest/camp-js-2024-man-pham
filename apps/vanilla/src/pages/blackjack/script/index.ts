import { Debugger } from './debugger';
import { DiceGenerator } from './dice-generator';
import { ResultDisplayer, WinStatusDisplayer } from './displayers';
import { Player } from './player';
import { TurnGenerator } from './turn-generator';

/** The Blackjack game application. */
class App {
	private readonly playerCount = 2;

	private readonly diceGenerator = DiceGenerator.getInstance();

	private readonly turnGenerator = new TurnGenerator(this.playerCount);

	public constructor() {
		const debuggerTool = new Debugger();
		const debuggerDisplayer = new ResultDisplayer('debugger');

		debuggerTool.result.subscribe(debuggerDisplayer);
		this.turnGenerator.subscribe(debuggerTool);

		const players = this.createPlayers();
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

	/** Perform the actions for the next player. */
	public playTurn(): void {
		this.turnGenerator.playTurn();
	}
}

const app = new App();

window.onload = function() {
	const rollButton = document.getElementById('button-roll');
	if (rollButton) {
		rollButton.onclick = function() {
			app.playTurn();
		};
	}
};
