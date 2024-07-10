import { DebuggerDisplayer } from './Debugger';
import { DiceGenerator } from './DiceGenerator';
import { Player } from './Player';
import { ResultDisplayer } from './ResultDisplayer';
import { TurnGenerator } from './TurnGenerator';
import { WinStatusDisplayer } from './WinStatusDisplayer';

const diceResultElement = document.getElementById('dice-cap')!;
const diceTotalScoreElement = document.getElementById('dice-result')!;

const player1ResultsElement = document.getElementById('player1-dice')!;
const player1TotalScoreElement = document.getElementById('player1-total')!;
const player2ResultsElement = document.getElementById('player2-dice')!;
const player2TotalScoreElement = document.getElementById('player2-total')!;
const rollButton = document.getElementById('button-roll')!;

const player1 = new Player(0);
const player2 = new Player(1);

const debbugerDisplayer = new DebuggerDisplayer(diceResultElement, diceTotalScoreElement);
const player1Displayer = new ResultDisplayer(player1ResultsElement, player1TotalScoreElement);
const player1WinStatusDisplayer = new WinStatusDisplayer(player1ResultsElement);
const player2Displayer = new ResultDisplayer(player2ResultsElement, player2TotalScoreElement);
const player2WinStatusDisplayer = new WinStatusDisplayer(player2ResultsElement);

const turnGenerator = new TurnGenerator();
const diceGenerator = DiceGenerator.getInstance();

player1.result.subscribe(player1Displayer);
player1.winStatus.subscribe(player1WinStatusDisplayer);
player2.result.subscribe(player2Displayer);
player2.winStatus.subscribe(player2WinStatusDisplayer);

turnGenerator.subscribe(player1);
turnGenerator.subscribe(player2);
turnGenerator.subscribe(debbugerDisplayer);

diceGenerator.subscribe(turnGenerator);

rollButton.addEventListener('click', () => {
	turnGenerator.next();
});
