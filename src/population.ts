import { Chromosome } from './chromosome';
import { CONSTANTS } from './constants';


export class Population{

    sizeOfPopulation : number;
    winnerChromosome : Chromosome;
    chromossomes : Chromosome[] = [];
    iterations : number = 0;
    quantityOfGenes : number;

    constructor(sizeOfPopulation : number){
        this.sizeOfPopulation = sizeOfPopulation;
    }

    //criar população inicial aleatoria
    initialize(quantityOfGenes : number){
        this.quantityOfGenes = quantityOfGenes;
        for(let i = 0; i < this.sizeOfPopulation; i++){
            this.chromossomes.push(
                new Chromosome().randomInitialization(
                        this.quantityOfGenes
                    )
            );
        }
    }

    //ordenador por  nivel de fitness
    orderByFitness(){
        this.chromossomes.sort((a, b) => {
            return b.fitness - a.fitness;
        });

    }

    //excluir os cromossomos menos capazes
    deleteUnfit(numberOfSurvivingChromossomes : number){
        for(let i = 0; i <= Math.round(numberOfSurvivingChromossomes); i++){
            this.chromossomes.pop();
        }
    }

    //combinar chromosomos, gerar filhos e talvez liberar mutações
    crossover(){
        this.resetPositions();
        for(let i = 0; i < Math.round(this.sizeOfPopulation / 2); i += 2){
            this.chromossomes.push(
                new Chromosome()
                    .parentalInitialization(
                        this.chromossomes[i], 
                        this.chromossomes[i + 1]
                    )
            );

            this.chromossomes.push(
                new Chromosome()
                    .parentalInitialization(
                        this.chromossomes[i], 
                        this.chromossomes[i + 1]
                    )
            );
        }        
    }

    //resetar posições
    resetPositions(){
        for(let each of this.chromossomes){
            each.position = [0,0];
        }
    }

    //verifica condições se deve terminar a execução
    termination(){
        this.iterations++;
        this.orderByFitness();
        if(this.iterations == CONSTANTS.maxIteration){
            this.winnerChromosome = this.chromossomes[0];
            return true;
        }

        if(this.chromossomes[0].fitness === CONSTANTS.quantityOfPluses){
            this.winnerChromosome = this.chromossomes[0];
            return true;
        }

        for(var each of this.chromossomes){
            each.fitness = 0;
        }
        return false;
    }
}