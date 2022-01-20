const {data} = require('./data-day1');

function A (data) {
    return data.reduce((acc, currentValue, index) => {
        if (currentValue > data[index-1])
            acc++;
        return acc;
    }, 0);
}

function B (data) {
    return data.map((currentValue, index) => {
        return (currentValue + data[index+1] + data[index+2])
    }).filter(data => !isNaN(data));
}


// function C (data) {
//     // let acc = 0
//     // let index = 0;

//     // for(const currentValue of data) {
//     //     const A = currentValue + data[index+1] + data[index+2];
//     //     const B = data[index+1] + data[index+2] + data[index+3];

//     //     if (B > A)
//     //         acc++;
//     //     index++;
//     //     // return acc;


//     // }

//     // return acc;
//     return data.reduce((acc, currentValue, index) => {
//         const A = currentValue + data[index+1] + data[index+2];
//         const B = data[index+1] + data[index+2] + data[index+3];

//         if (B > A)
//             acc++;
//         return acc;
//     }, 0);
// }

console.time('test');
console.log(A(B(data)));
// console.log(C(data));
console.timeEnd('test'); //Prints something like that-> test: 11374.004ms
