import { Population } from './population';

let population = new Population(5);

population.initialize(3, -5000, 5000);

while(!population.termination()){
    population.deleteUnfit();
    population.setFitness()
    population.crossover();
}

console.log('-------------------------------------');
console.log(population.winnerChromosome);