import { Population } from './population';
import { Game } from './game';
var blessed = require('blessed');

const POPULATION_SIZE = 10;
const NUMBER_OF_MOVES = 20;
const NUMBER_OF_TURNS = NUMBER_OF_MOVES;

let population = new Population(POPULATION_SIZE);
population.initialize(NUMBER_OF_MOVES);
let game = new Game(NUMBER_OF_TURNS,population);
let done = false;


let screen = blessed.screen({
    smartCSR: true
});

screen.title = 'Algoritmos Genéticos';

let box = blessed.box({
    width: '100%',
    height: '100%'
});

// Append our box to the screen.
screen.append(box);

screen.key('enter', function(ch, key){
    //se tiver que acabar
    if(!done){
        if(population.termination()){
        box.setContent('-------------------------------------------------\n' + 
                            population.winnerChromosome.toString() +
                            '\n-------------------------------------------------');
            screen.render();
            done = true;
        }else{
            if(game.turn <= game.maxTurn){
                game.nextMove();
                box.setContent(game.getBoard());
            }else{
                box.setContent(population.chromossomes[0].genes.toString());
                population.deleteUnfit(population.sizeOfPopulation / 2);
                population.crossover();
                game = new Game(NUMBER_OF_TURNS,population);
            }
            screen.render();
        }
    }
});

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
});

// Focus our element.
box.focus();

// Render the screen.
screen.render();

