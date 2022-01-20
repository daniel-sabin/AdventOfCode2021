const { readFile } = require('./utils/read-file');
const grid = readFile('./data/day4.grid');

/**
 * 
 * @param {string[]} data 
 * @returns {{lines:Number[][], columns: Number[][], completed: boolean}}
 */
function buildGrid(data) {
    const grid55 = {
        lines: [[],[],[],[],[]],
        columns: [[],[],[],[],[]],
        completed: false
    };

    let i = 0;
    for(const line of data) {
        if (line === '')
            return grid55;

        grid55.lines[i] = line.split(' ').filter(val => val !== '').map(val => Number(val))
        
        grid55.columns[0].push(grid55.lines[i][0])
        grid55.columns[1].push(grid55.lines[i][1])
        grid55.columns[2].push(grid55.lines[i][2])
        grid55.columns[3].push(grid55.lines[i][3])
        grid55.columns[4].push(grid55.lines[i][4])
        i++;
    }

    return grid55;
}

/**
 * 
 * @param {string[]} data 
 * @returns {{lines:Number[][], columns: Number[][], completed: boolean}[]}
 */
function buildGrids (data) {
    let lines = []
    const grids = []
    for(const line of data) {
        if (line === '') {
            grids.push(buildGrid(lines))
            lines = [];
        } else
        lines.push(line)
    }

    return grids;
}

/**
 * 
 * @param {{lines:Number[][], columns: Number[][], completed: boolean}[]} grids 
 * @param {Number[]} draw 
 */
function bingoFactory(grids, draw) {
    /**
     * @param {boolean} getLastWinner
     * @returns {number|undefined}
     */
    return (getLastWinner = false) => {
        let returned;
        for(const random of draw) {
            for (const [i, grid] of grids.entries()) {
                if(!grids[i].completed) {
                    grids[i] = {
                        lines: grid.lines.map(line => line.map(val => val === random ? 0: val)),
                        columns: grid.columns.map(line => line.map(val => val === random ? 0: val)),
                        completed: false,
                    }
                    if (hasGridWins(grids[i])) {
                        grids[i].completed = true;
                        const reducer = (previousValue, currentValue) => previousValue + currentValue;
                        returned = grids[i].lines.map(val => val.reduce(reducer)).reduce(reducer) * random;
                        if(!getLastWinner)
                            return returned;
                    }
                }

            }
        }

        return returned;
    }
}
/**
 * 
 * @param {{lines:Number[][], columns: Number[][], completed: boolean}} grid
 */
function hasGridWins(grid) {
    const reducer = (acc, val) => acc + val;
    const finder = val => val === 0;
    const a = grid.lines.map(line => line.reduce(reducer))
    const b = grid.columns.map(line => line.reduce(reducer))
    return a.find(finder) !== undefined || b.find(finder) !== undefined
}

/**
 * @param {boolean} getLastWinner
 */
function main(getLastWinner) {
    // const draw = '7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1'.split(',').map(val => Number(val))
    const draw = '72,86,73,66,37,76,19,40,77,42,48,62,46,3,95,17,97,41,10,14,83,90,12,23,81,98,11,57,13,69,28,63,5,78,79,58,54,67,60,34,39,84,94,29,20,0,24,38,43,51,64,18,27,52,47,74,59,22,85,65,80,2,99,70,33,91,53,93,9,82,8,50,7,56,30,36,89,71,21,49,31,88,26,96,16,1,75,87,6,61,4,68,32,25,55,44,15,45,92,35'.split(',').map(val => Number(val))
    const bingo = bingoFactory(buildGrids(grid), draw);
    console.log(bingo(getLastWinner));
}

main(false);
main(true);
