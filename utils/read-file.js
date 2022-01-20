const fs = require('fs');

const readFile = filename => {
    const data = fs.readFileSync(filename, {encoding:'utf8', flag:'r'});
    return Buffer.from(data).toString('utf8').split(/\r?\n/);
}

module.exports = {readFile}