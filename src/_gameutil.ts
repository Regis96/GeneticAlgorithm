export class GameUtil {
    hasRun = false;

    constructor(){}

    printBoard(board : string[][]){
        if(this.hasRun){
            console.log('\033[32m');
        }
        for(let i = 0; i < board.length; i++){
            let string = '';
            for(let k = 0; k < board[i].length; k++){
                string += board[i][k] + ' ';
            }
            console.log(string);
        }

        this.hasRun = true;
    }

}
