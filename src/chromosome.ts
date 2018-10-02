export class Chromosome {

    genes: number[] = [];
    fitness: number;

    constructor() {}

    randomInitialization(quantityOfGenes, lowerBoundary, upperBoundary) {
        for (let i = 0; i < quantityOfGenes; i++) {
            this.genes.push(Math.random() * (upperBoundary - lowerBoundary) + lowerBoundary);
        }
        return this;
    }

    parentalInitialization(father : Chromosome, mother : Chromosome, lowerBoundary, upperBoundary){
        for(let i = 0; i < father.genes.length; i++){
            this.genes.push(Math.random() >= 0.5 ? mother.genes[i] : father.genes[i]);
        }
        if(Math.random() > 0,1 && Math.random() < 0,2){
            this.genes[Math.round((Math.random() * 10)) % 3] = Math.random() * (upperBoundary - lowerBoundary) + lowerBoundary;
        }
        return this;
    }

}