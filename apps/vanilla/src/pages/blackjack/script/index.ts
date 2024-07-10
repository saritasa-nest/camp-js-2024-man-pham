import { DiceGenerator } from './DiceGenerator';
import { Player } from './Player';
import { ResultDisplayer } from './ResultDisplayer';
import { TurnGenerator } from './TurnGenerator';

const player1ResultsElement = document.getElementById('player1-dice')!;
const player2ResultsElement = document.getElementById('player2-dice')!;
const allResultsElement = document.getElementById('dice-cap')!;
const rollButton = document.getElementById('button-roll')!;

const player1 = new Player(0, player1ResultsElement);
const player2 = new Player(1, player2ResultsElement);
const turnGenerator = new TurnGenerator();
const diceGenerator = DiceGenerator.getInstance();

const allResultsDisplayer = new ResultDisplayer(allResultsElement);

player1.result.subscribe(allResultsDisplayer);

turnGenerator.subscribe(player1);
turnGenerator.subscribe(player2);

diceGenerator.subscribe(turnGenerator);

rollButton.addEventListener('click', () => {
	turnGenerator.next();
});
