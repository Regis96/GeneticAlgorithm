import { Population } from './population';
import { Game } from './game';
var blessed = require('blessed');

const POPULATION_SIZE = 40;
const NUMBER_OF_MOVES = 20;
const NUMBER_OF_TURNS = NUMBER_OF_MOVES;

let population = new Population(POPULATION_SIZE);
population.initialize(NUMBER_OF_MOVES);
let game = new Game(NUMBER_OF_TURNS,population);
let done = false;


let screen = blessed.screen({
    smartCSR: true
});

let box = blessed.box({
    width: '100%',
    height: '100%'
});

// Append our box to the screen.
screen.append(box);

screen.key('enter', function(ch, key){
    //se tiver que acabar
    if(!done){
        if(!game.isOver()){
            game.nextMove();
            box.setContent(game.getBoard(false));
        }else{
            box.setContent(game.getBoard(true));
            
            if(population.termination()){
                box.setContent('--------------------------------------------------------\n' + 
                                    population.winnerChromosome +
                               '\n--------------------------------------------------------');
                screen.render();
                done = true;
            }else{
                box.insertBottom(population.chromossomes[0].getPrettyGenes());
                population.deleteUnfit(population.sizeOfPopulation / 2);
                population.crossover();
                game = new Game(NUMBER_OF_TURNS,population);
            }
        }
        screen.render();
    }
    
});

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
    return process.exit(0);
});

// Focus our element.
box.focus();
box.setContent(game.getBoard(false));
// Render the screen.
screen.render();


