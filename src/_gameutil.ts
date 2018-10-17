export class GameUtil {
    rl = require('readline');

    constructor(){}

    printBoard(board : string[][]){
        //process.stdout.write('\033c');
        this.rl.cursorTo(process.stdout,0,0);
        process.stdout.clearScreenDown();
        for(let i = 0; i < board.length; i++){
            let string = '';
            for(let k = 0; k < board[i].length; k++){
                string += board[i][k] + ' ';
            }
            process.stdout.write(string + '\n');
        }
        this.rl.cursorTo(process.stdout,0,0);
    }

}
