import { Chromosome } from './chromosome';

export class Population{

    sizeOfPopulation : number;
    lowerBoundary : number;
    upperBoundary : number;
    winnerChromosome : Chromosome;
    chromossomes : Chromosome[] = [];
    iterations : number = 0;
    fitnessFunction : Function;

    constructor(sizeOfPopulation : number){
        this.sizeOfPopulation = sizeOfPopulation;
    }

    //criar população inicial aleatoria
    initialize(quantityOfGenes : number, lowerBoundary : number, upperBoundary : number, fitnessFunction : Function){
        this.lowerBoundary = lowerBoundary;
        this.upperBoundary = upperBoundary;
        this.fitnessFunction = fitnessFunction;
        for(let i = 0; i < this.sizeOfPopulation; i++){
            this.chromossomes.push(new Chromosome().randomInitialization(quantityOfGenes, this.lowerBoundary, this.upperBoundary));
        }
    }

    //define o fitness de cada chromossomo
    setFitness(){
        for(let each of this.chromossomes){
            each.fitness =  this.fitnessFunction(each);
        }

        //ordenador por  nivel de fitness
        this.chromossomes.sort((a, b) => {
            return b.fitness - a.fitness;
        });

    }

    //excluir os cromossomos menos capazes
    deleteUnfit(numberOfSurvivingChromossomes : number){
        for(let i = 0; i < Math.round(numberOfSurvivingChromossomes); i++){
            this.chromossomes.pop();
        }
    }

    //combinar chromosomos, gerar filhos e talvez liberar mutações
    crossover(){
        for(let i = 0; i < Math.round(this.sizeOfPopulation / 2); i += 2){
            this.chromossomes.push(
                new Chromosome()
                    .parentalInitialization(
                        this.chromossomes[i], 
                        this.chromossomes[i + 1],
                        this.lowerBoundary, 
                        this.upperBoundary
                    )
            );

            this.chromossomes.push(
                new Chromosome()
                    .parentalInitialization(
                        this.chromossomes[i], 
                        this.chromossomes[i + 1],
                        this.lowerBoundary, 
                        this.upperBoundary
                    )
            );
        }        
    }

    //verifica condições se deve terminar a execução
    termination(){
        this.iterations++;
        // if(this.iterations === 10000){
        //     this.winnerChromosome = this.chromossomes[0];
        //     return true;
        // }
        this.setFitness();
        if(this.iterations % 1000 === 0 ){
            console.log('Maior fitness:' + this.chromossomes[0].fitness);
        }
        if(this.chromossomes[0].fitness === 1){
            this.winnerChromosome = this.chromossomes[0];
            return true;
        }
        return false;
    }
}