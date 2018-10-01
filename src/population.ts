import { Chromosome } from "./chromosome";

export class Population{

    sizeOfPopulation : number;
    chromosomes : number[];

    constructor(sizeOfPopulation){
        this.sizeOfPopulation = sizeOfPopulation;
    }

    //criar população inicial aleatoria
    intialize(){
        this.chromosomes = [];
        for(let i = 0; i < this.sizeOfPopulation; i++){
            //this.chromosomes.push(new Chromosome);
        }
    }

    //verificar se alcançou o objetivo
    verifyFitness(){

    }

    //combinar chromosomos e gerar filhos
    crossover(){

    }

    //verificar se deve ocorrer mutação nos genes
    mutation(){

    }

    //verifica condições se deve terminar a execução
    termination(){

    }
}