import { Chromosome } from './chromosome';

export class Population{

    sizeOfPopulation : number;
    lowerBoundary : number;
    upperBoundary : number;
    winnerChromosome : Chromosome;
    chromossomes : Chromosome[] = [];
    iterations : number = 0;

    constructor(sizeOfPopulation){
        this.sizeOfPopulation = sizeOfPopulation;
    }

    //criar população inicial aleatoria
    initialize(quantityOfGenes, lowerBoundary, upperBoundary){
        this.lowerBoundary = lowerBoundary;
        this.upperBoundary = upperBoundary;
        for(let i = 0; i < this.sizeOfPopulation; i++){
            this.chromossomes.push(new Chromosome().randomInitialization(quantityOfGenes, this.lowerBoundary, this.upperBoundary));
        }
    }

    //define o fitness de cada chromossomo
    setFitness(){
        for(let each of this.chromossomes){
            //x ^ 3 + y ^ 2 + z = 1000
            let result = Math.pow(each.genes[0], 3) + Math.pow(each.genes[1], 2) + each.genes[2];
            each.fitness =  result > 1000? 1000 / result : result / 1000;
        }

        this.chromossomes.sort((a, b) => {
            return b.fitness - a.fitness;
        });

    }

    //excluir os cromossomos menos capazes
    deleteUnfit(){
        for(let i = 0; i < Math.round(this.sizeOfPopulation / 2); i++){
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
        if(this.iterations === 10000){
            this.winnerChromosome = this.chromossomes[0];
            return true;
        }
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