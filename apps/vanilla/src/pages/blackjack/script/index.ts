import { DiceGenerator } from './DiceGenerator';
import { Player } from './Player';
import { ResultDisplayer } from './ResultDisplayer';
import { TurnGenerator } from './TurnGenerator';

const player1ResultsElement = document.getElementById('player1-dice')!;
const player2ResultsElement = document.getElementById('player2-dice')!;
const player1TotalScoreElement = document.getElementById('player1-total')!;
const player2TotalScoreElement = document.getElementById('player2-total')!;
const rollButton = document.getElementById('button-roll')!;

const player1 = new Player(0);
const player2 = new Player(1);

const player1Displayer = new ResultDisplayer(player1ResultsElement, player1TotalScoreElement);
const player2Displayer = new ResultDisplayer(player2ResultsElement, player2TotalScoreElement);

const turnGenerator = new TurnGenerator();
const diceGenerator = DiceGenerator.getInstance();

player1.result.subscribe(player1Displayer);
player2.result.subscribe(player2Displayer);

turnGenerator.subscribe(player1);
turnGenerator.subscribe(player2);

diceGenerator.subscribe(turnGenerator);

rollButton.addEventListener('click', () => {
	turnGenerator.next();
});
