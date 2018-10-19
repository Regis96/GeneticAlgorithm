import { Chromosome } from './chromosome';

const BOARD_SIZE = [6,6];

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
                        this.quantityOfGenes, 
                        BOARD_SIZE
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
                        this.chromossomes[i + 1],
                        BOARD_SIZE
                    )
            );

            this.chromossomes.push(
                new Chromosome()
                    .parentalInitialization(
                        this.chromossomes[i], 
                        this.chromossomes[i + 1],
                        BOARD_SIZE
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
        if(this.iterations == 10){
            this.winnerChromosome = this.chromossomes[0];
            return true;
        }
        if(this.iterations % 1000 == 0 ){
            console.log('Maior fitness(pontuação):' + this.chromossomes[0].fitness);
        }
        if(this.chromossomes[0].fitness === 7){
            this.winnerChromosome = this.chromossomes[0];
            return true;
        }

        for(var each of this.chromossomes){
            each.fitness = 0;
        }
        return false;
    }
}