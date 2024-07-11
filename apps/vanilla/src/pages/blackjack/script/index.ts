import { Debbuger } from './Debugger';
import { DiceGenerator } from './DiceGenerator';
import { ResultDisplayer } from './Displayers';
import { Player } from './Player';
import { TurnGenerator } from './TurnGenerator';

const rollButton = document.getElementById('button-roll')!;

const debbugerTool = new Debbuger();
const player1 = new Player(0);
const player2 = new Player(1);

const turnGenerator = new TurnGenerator();
turnGenerator.subscribe(player1);
turnGenerator.subscribe(player2);
turnGenerator.subscribe(debbugerTool);

const diceGenerator = DiceGenerator.getInstance();
diceGenerator.subscribe(turnGenerator);

const debuggerDisplayer = new ResultDisplayer('Debugger');
const player1Displayer = new ResultDisplayer('player1');
const player2Displayer = new ResultDisplayer('player2');

debbugerTool.result.subscribe(debuggerDisplayer);
player1.result.subscribe(player1Displayer);
player2.result.subscribe(player2Displayer);

rollButton.addEventListener('click', () => {
	turnGenerator.next();
});
