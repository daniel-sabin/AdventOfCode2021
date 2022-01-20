const { readFile } = require('./utils/read-file');

const vectors = readFile('./data/day5.data');
/**
 * 
 * @param {string[]} data 
 * @returns {{x1: Number, y1: Number, x2: Number, y2: Number}[]}
 */
const buildVectors = (data) => {
    const vectors = []
    for(const line of data) {
        
        const temp = /^(\d)\,(\d).*(\d)\,(\d)$/.exec(line);
        const vector = {
            x1: Number(temp[1]),
            y1: Number(temp[2]),
            x2: Number(temp[3]),
            y2: Number(temp[4]),
        }
        if ((vector.x1 - vector.x2 === 0) || (vector.y1 - vector.y2 === 0)) {
            vectors.push(vector);
        }
    }
    return vectors;
}


/**
 * 
 * @param {{x1: Number, y1: Number, x2: Number, y2: Number}[]} vectors 
 */
const traceVectors = (vectors) => {
    const grid = []
    for (const vector of vectors) {
        if (vector.x1 === vector.x2) {
            let index = vector.y1;
            do {
                // let dontBreak = true;

                if (!grid[vector.x1]) grid[vector.x1] = []
                grid[vector.x1][index] = 1;
                if(vector.y1 < vector.y2) {
                    index
                    start ++;
                } else {
                    start--;
                }
            } while(dontBreak);
        }
    }
    return grid;
}


const data = traceVectors(buildVectors(vectors))

console.log(data);   


