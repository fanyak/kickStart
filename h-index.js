#!/usr/bin/env node
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

let cur = 0;
const testCases = {
    number: cur,
    cases: [],
}

rl.on('line', (d) => {
    // rl.output.write(d)
    if(!testCases.number) {
        testCases.number = Number(d);
    } else {
        if(!testCases.cases[cur]) {
            testCases.cases[cur] = {};
        }
        if (testCases.cases[cur].papers === undefined) {
            testCases.cases[cur].papers = Number(d);
        } else {
            testCases.cases[cur].citations = d.split(' ');
            cur += 1;
        }
        
    }
});

rl.on('close', () => {
    processCases();
})

function processCases() {
    // rl.output.write(testCases)
    testCases.cases.forEach(({papers, citations}) => {
        const res = [];
        citations.forEach((citation, index) => {
            const papersWritten = index + 1;
            const sub = citations.slice(0, papersWritten).filter(c => c >= papersWritten);
            console.log(sub.length, papersWritten)
            // if(sub.length >= papersWritten){
            //     res.push(papersWritten);
            // } else {
            //     return res.push(res.slice(-1) !== undefined ? res.slice(-1) : index);
            // }
        });
        console.log(res.join(','));
    });
    // rl.output.write(res.join(','));
}
