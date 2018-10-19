import { Population } from './population';

export class Game{
    turn : number;
    maxTurn: number;
    board : string[][] = [];
    pluses : number[][] = [[0,2],[1,3],[2,5],[4,5],[5,4],[3,1],[6,5]];
    population : Population;

    constructor(maxTurn : number, population : Population){
        this.maxTurn = maxTurn;
        this.population = population;
        this.turn = 1;       
     
    }

    nextMove(){
        this.receiveActions();
        this.collisionCheck();
        this.turn += 1;
    }

    getBoard(showFitness){
        this.preRenderBoard(showFitness);
        let tempBoardString = '';

        for(let line of this.board){
            for(let cell of line){
                tempBoardString += cell;
            }
            tempBoardString += '\n';
        }

        return tempBoardString;
    }

    private preRenderBoard (showFitness : boolean){
        this.board = [];
        this.board.push([' ',' ',' ',' ',' ',' ',' ',' ']);
        this.board.push([' ',' ',' ',' ',' ',' ',' ',' ']);
        this.board.push([' ',' ',' ',' ',' ',' ',' ',' ']);
        this.board.push([' ',' ',' ',' ',' ',' ',' ',' ']);
        this.board.push([' ',' ',' ',' ',' ',' ',' ',' ']);
        this.board.push([' ',' ',' ',' ',' ',' ',' ',' ']);
        this.board.push([' ',' ',' ',' ',' ',' ',' ',' ']);
        this.board.push([' ',' ',' ',' ',' ',' ',' ',' ']);
        this.board.push([' ',' ',' ',' ',' ',' ',' ',' ']);
        for(let each of this.pluses){
            this.board[each[0]][each[1]] = '+';
        }
        if(!showFitness){
            for(let each of this.population.chromossomes){
                this.board[each.position[0]][each.position[1]] = 'C';
            }
        }else{
            for(let each of this.population.chromossomes){
                this.board[each.position[0]][each.position[1]] = each.fitness.toString();
            }
        }
    }

    private receiveActions(){
        for(let each of this.population.chromossomes){
            each.makeMove(this.turn - 1);
        }
    }

    private collisionCheck(){
        for(let chromossome of this.population.chromossomes){
            for(var plus of this.pluses){
                if(chromossome.position[0] == plus[0] && chromossome.position[1] === plus[1]){
                    if(!chromossome.hasCollidedBefore(plus)){
                        chromossome.upFitness();
                    }
                    break;
                }
            }
        }
    }

    isOver(){
        return this.turn > this.maxTurn
    }
}