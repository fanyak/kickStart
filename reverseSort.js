#!/usr/bin/env node

function readInput() {
    const readline = require('readline');
    const rl =  readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });
    let problem = {
        T: 0,
        testCases: [],
    }
    let currentLength = 0;
    rl.on('line', function(line){
        if(!problem.T) {
            problem.T = Number(line);
        } else if (!currentLength) {
            currentLength = Number(line);
        } else {
            const currentCase = line.split(' ').map(n => Number(n));
            if(currentCase.length !== currentLength) {              
                throw new Error('wrong case length');
            }
            problem.testCases.push(currentCase);
            currentLength = 0;
        }
    });
    rl.on('close', () => {
        if(problem.T !== problem.testCases.length ) {
            throw new error('wrong number of cases')
        }
        solveProblem(problem.testCases);
    })
}
function reverse(L,i,j) {
    if (i >= j) {
        return;
    }
    const temp = L[i];
    L[i] = L[j];
    L[j] = temp;
    return reverse(L, i+1, j-1);
}
function reverseSort(L) {
    let cost = 0;
    for (let i = 0; i < L.length-1; i++) {
        const sub = L.slice(i);
        const min = Math.min(...sub);
        let j = L.indexOf(min, i);
        if (j!==i) {
            reverse(L,i,j);
        }       
        cost += (j-i+1);
    }
    return cost;
}
function solveProblem(cases) {
    for(let i=0; i < cases.length; i++) {
        process.stdout.write(`Case #${i+1}: ${reverseSort(cases[i])}\n`);
    }
}

readInput();
