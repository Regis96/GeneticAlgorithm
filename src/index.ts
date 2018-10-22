import { Population } from './population';
import { Game } from './game';
import { CONSTANTS } from './constants';
import { PrettyScreen } from './prettyScreen';


let population = new Population(CONSTANTS.populationSize);
population.initialize(CONSTANTS.numberOfMoves);
let game = new Game(CONSTANTS.numberOfTurns,population);
let isOver = false;
let prettyScreen = new PrettyScreen();


prettyScreen.on('enter', forward);
prettyScreen.on('f', finish);


function forward(){
    if(!isOver){
        if(!game.isOver()){
            game.nextMove();
            prettyScreen.print(game.getBoard(false));
        }else{
            prettyScreen.print(game.getBoard(true));
            
            if(population.termination()){
                prettyScreen.print(printWinnerScreen());
                isOver = true;
            }else{
                prettyScreen.appendToScreen(population.chromossomes[0].getPrettyGenes());
                population.deleteUnfit(population.sizeOfPopulation / 2);
                population.crossover();
                game = new Game(CONSTANTS.numberOfTurns,population);
            }
        }
    }
}

function finish(){
    do{
        while(!game.isOver){
            game.nextMove();
        }
        if(population.termination()){
            prettyScreen.print(printWinnerScreen());
            isOver = true;
        }else{
            population.deleteUnfit(population.sizeOfPopulation / 2);
            population.crossover();
            game = new Game(CONSTANTS.numberOfTurns,population);
        }
    }while(!isOver);    
}

function printWinnerScreen(){
    return ('-------------------------------------------------------------------\n' + 
            'Vencedor: ' + population.winnerChromosome + '\nRounds: ' + population.iterations +
            '\n-------------------------------------------------------------------');
}

prettyScreen.print(game.getBoard(false))