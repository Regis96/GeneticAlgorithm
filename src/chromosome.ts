export class Chromosome{

    genes : number[];
    fitness : number;

    constructor(quantityOfGenes,lowerBoundary,upperBoundary){
        for(let i = 0; i < quantityOfGenes; i++){
            this.genes.push(Math.random() * (upperBoundary - lowerBoundary) + lowerBoundary);
        }
    }
}