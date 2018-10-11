import { Population } from './population';

let population = new Population(5);


population.initialize(3, -1000, 1000, fitnessFunction);

while(!population.termination()){
    population.deleteUnfit(population.sizeOfPopulation / 2);
    population.setFitness()
    population.crossover();
}


function fitnessFunction(each){
    //x ^ 3 + y ^ 2 + z = 1000
    let result =  Math.pow(each.genes[0], 3) + Math.pow(each.genes[1], 2) + each.genes[2];
    return result > 1000? 1000 / result : result / 1000
}
console.log('x ^ 3 + y ^ 2 + z = 1000');
console.log('-------------------------------------');
console.log(population.winnerChromosome.genes[0] + ' ^ 3 + '+ 
            population.winnerChromosome.genes[1] +' ^ 2 + ' + 
            population.winnerChromosome.genes[2] + ' = ' + 
            (
                Math.pow(population.winnerChromosome.genes[0], 3) + 
                Math.pow(population.winnerChromosome.genes[1], 2) + 
                population.winnerChromosome.genes[2]
            ));