const { readFile } = require('./utils/read-file');

const moveMe = (positions, instructions) => {
    for(const instruction of instructions) {
        const [move, position] = instruction.split(' ');

        switch(move) {
            case 'forward':
                positions[0] += Number(position);
                positions[2] += positions[1]*Number(position);
                break;
            case 'up':
                positions[1] -= Number(position);
                break;
            case 'down':
                positions[1] += Number(position);
                break;
        }
    }
    // console.log(positions);
    console.log(positions[0] * positions[2]);
}

moveMe([0,0,0], readFile('./data/day2.instructions'));
