import { GameUtil } from './_gameutil';
import { Population } from './population';

export class Game{
    gameUtil : GameUtil;
    turnsLeft : number;
    board : string[][] = [];
    pluses : number[][] = [[0,1],[1,2],[2,4],[3,5],[4,7],[6,3],[7,7]];
    population : Population;

    constructor(turnsLeft : number, population : Population){
        this.turnsLeft = turnsLeft;
        this.population = population;
        this.gameUtil = new GameUtil();
        //this.preRenderBoard();
    }
    
    async start(){
        while(this.turnsLeft--){
            //this.receiveActions();
            this.preRenderBoard();
            this.gameUtil.printBoard(this.board);
            await this.sleep(3000);
        }
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

        
    }

    private receiveActions(){

    }

    sleep(ms){
        return new Promise(resolve => {
            setTimeout(resolve,ms);
        })
    }

}

new Game(2, new Population(10)).start();