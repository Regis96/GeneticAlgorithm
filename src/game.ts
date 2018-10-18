import { Population } from './population';

export class Game{
    turn : number;
    maxTurn: number;
    board : string[][] = [];
    pluses : number[][] = [[0,1],[1,2],[2,4],[3,5],[4,7],[6,3],[7,7]];
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

    getBoard(){
        this.preRenderBoard();
        let tempBoardString = '';

        for(let line of this.board){
            for(let cell of line){
                tempBoardString += cell;
            }
            tempBoardString += '\n';
        }

        return tempBoardString;
    }

    private preRenderBoard (){
        this.board.push([' ',' ',' ',' ',' ',' ',' ',' ',' ']);
        this.board.push([' ',' ',' ',' ',' ',' ',' ',' ',' ']);
        this.board.push([' ',' ',' ',' ',' ',' ',' ',' ',' ']);
        this.board.push([' ',' ',' ',' ',' ',' ',' ',' ',' ']);
        this.board.push([' ',' ',' ',' ',' ',' ',' ',' ',' ']);
        this.board.push([' ',' ',' ',' ',' ',' ',' ',' ',' ']);
        this.board.push([' ',' ',' ',' ',' ',' ',' ',' ',' ']);
        this.board.push([' ',' ',' ',' ',' ',' ',' ',' ',' ']);
        this.board.push([' ',' ',' ',' ',' ',' ',' ',' ',' ']);
        for(let each of this.pluses){
            this.board[each[0]][each[1]] = '+';
        }

        for(let each of this.population.chromossomes){
            this.board[each.position[0]][each.position[1]] = 'C';
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
                    chromossome.upFitness();
                    break;
                }
            }
        }
    }
}