#!/usr/bin/env node
const readline = require('readline');
const rl =  readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});
const testCases = {
    number: 0,
    cases: [],
};

rl.on('line', (d) => {
    if(!testCases.number) {
        testCases.number = Number(d);
    } else {
        testCases.cases.push(d);
    }
});

rl.on('close', () => {
    processCases();
});

function processCases() {
    // const txt = 'Case #x: K is ruled by Y'
    const vowels = ['a', 'o', 'e', 'u', 'i'];
    const resMap = new Map( [ [true, 'Alice'], [false, 'Bob'], [null, 'nobody'] ] );
    const res = testCases.cases.map((c, index) => {
        const lastLetter = c.slice(-1);
        let actor = null;
        if (lastLetter.toLowerCase() === 'y') {
            actor = resMap.get(actor)
        } else  {
            let condition = vowels.includes(lastLetter.toLowerCase());
            actor = resMap.get(condition);
        }
        return `Case #${index}: ${c} is ruled by ${actor}`;
    });
    res.forEach(r => {
        rl.output.write(`${r} \n`);
    });
}
