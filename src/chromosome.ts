enum MOVE_TYPE {
    Down,
    Right,
    Up,
    Left
}
export class Chromosome {

    genes: number[] = [];
    fitness: number = 0;
    position: number[] = [0,0];
    boardSize: number[];
    collisions : number[][] = [];

    constructor() {}

    randomInitialization(quantityOfGenes : number, boardSize : number[]) {
        this.boardSize = boardSize;

        for (let i = 0; i < quantityOfGenes; i++) {
            this.genes.push(Math.round(Math.random() * 3));
        }
        return this;
    }

    parentalInitialization(father : Chromosome, mother : Chromosome, boardSize : number[]){
        this.boardSize = boardSize;

        for(let i = 0; i < father.genes.length; i++){
            this.genes.push(Math.random() >= 0.5 ? mother.genes[i] : father.genes[i]);
        }
        if(Math.random() > 0.1 && Math.random() < 0.2){
            this.genes[Math.round(Math.random() * father.genes.length - 1)] = Math.round(Math.random() * 4);
        }
        return this;
    }

    makeMove(turn : number){
        switch(this.genes[turn]){
            case MOVE_TYPE.Down:{
                if(this.position[0] <= this.boardSize[0]){
                    this.position[0] += 1;
                }
                break;
            }
            case MOVE_TYPE.Right:{
                if(this.position[1] <= this.boardSize[1]){
                    this.position[1] += 1;
                }
                break;
            }
            case MOVE_TYPE.Up:{
                if(this.position[0] > 0){
                    this.position[0] -= 1;
                }
                break;
            }
            case MOVE_TYPE.Left:{
                if(this.position[1] > 0){
                    this.position[1] -= 1;
                }
                break;
            }
        }
    }

    upFitness(){
        this.fitness +=1;
    }

    hasCollidedBefore(plus){
        for(var each of this.collisions){
            if(plus[0] === each[0] && plus[1] == each[1]){
                return true;
            }
        }
        this.collisions.push(plus);
        return false;
    }

    getPrettyGenes(){
            let prettyPrint = '';
            for(let each of this.genes){
                switch(each){
                    case 0:{
                        prettyPrint += '▼ ';
                        break;
                    }
                    case 1:{
                        prettyPrint += '► ';
                        break;
                    }
                    case 2:{
                        prettyPrint += '▲ ';
                        break;
                    }
                    case 3:{
                        prettyPrint += '◄ '
                        break;
                    }
                }
            }
        
            return prettyPrint;
        
    }

    toString(){
        return 'Fitness:' + this.fitness + ' - Genes:' + this.getPrettyGenes();
    }
}