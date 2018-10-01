import { Chromosome } from "./chromosome";

export class Population{

    sizeOfPopulation : number;
    chromossomes : Chromosome[];

    constructor(sizeOfPopulation){
        this.sizeOfPopulation = sizeOfPopulation;
    }

    //criar população inicial aleatoria
    intialize(quantityOfGenes, lowerBoundary, higherBoundary){
        for(let i = 0; i < this.sizeOfPopulation; i++){
            this.chromossomes.push(new Chromosome(quantityOfGenes, lowerBoundary, higherBoundary));
        }
    }

    //excluir os cromossomos menos capazes
    deleteUnfit(){

    }

    //define o fitness de cada chromossomo
    setFitness(){
        for(let each of this.chromossomes){
            //x ^ 3 + y ^ 2 + z = 1000
            let result = Math.pow(each.genes[0], 3) + Math.pow(each.genes[1], 2) + each.genes[2];
            each.fitness =  result > 1000? (result * (- 1) + 1000) / 1000 : result / 1000;//qual formula usar??
        }
    }

    //combinar chromosomos e gerar filhos
    crossover(){
        
    }

    //verifica condições se deve terminar a execução
    termination(){

    }
}