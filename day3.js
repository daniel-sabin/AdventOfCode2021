const { readFile } = require('./utils/read-file');
const decodeBinary = binary => parseInt(binary,2);

function doIt(input) {
    const data = input.reduce((acc, current) => current.split('').map((value, index) => (Number(value) === 1 && acc[index] + 1) || (Number(value) === 0 && acc[index] - 1)), []);
    const gammaRate = decodeBinary(data.map(val => val > 0 ? 1 : 0).join(''));
    const epsilonRate = decodeBinary(data.map(val => val <= 0 ? 1 : 0).join(''));
    return gammaRate * epsilonRate
}

function filterMe(data, index, classification) {
    const inputA = [];
    const inputB = [];
    for(const value of data){
        if (Number(value[index]) === classification)
            inputA.push(value)
        else
            inputB.push(value)
    }
    return [inputA, inputB]
}

function doItFactory(limit, classification, cb) {
    const doIt = (input, index = 0) => {
        if (index === limit)
            return input;
        
            const [inputA, inputB] = filterMe(input, index, classification);
        index++;
        return doIt(cb(inputA, inputB), index);
    }
    return doIt;
}

const doOxygen = doItFactory(12, 0, (inputA, inputB) => (inputA.length > inputB.length && inputA.length > 0)? inputA: inputB);
const doScrubber = doItFactory(12, 1, (inputA, inputB) => (inputA.length < inputB.length && inputA.length > 0 || inputB.length === 0)? inputA: inputB);

const [oxygenResult] = doOxygen(readFile('./data/data3.gammaRate'));
const [scrubberResult] = doScrubber(readFile('./data/data3.gammaRate'));

console.log(decodeBinary(oxygenResult) * decodeBinary(scrubberResult));
