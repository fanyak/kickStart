// # cat sample_problem_sample_ts1_input.txt | node index.js
function runTests(lines) {
    const [testNum, ...testCases] = lines;
    let bags = null;
    let kids = null; 
    let totalCandies = null;
    let indx = 0;
    for (let index = 0; index < Number(testNum) * 2; index ++) {
        test = testCases[index];  
        if (test) {
            if (bags === null) {
                indx += 1;
                [bags, kids] = test.split(' ').map((s) => Number(s));
            } else {
                totalCandies = test.split(' ').map((s) => Number(s)).reduce((acc, cur) => acc + cur, 0);
            }
            if (bags !== null && kids!== null && totalCandies!== null) {
                remainder = totalCandies % kids;
                console.log(`Case #${indx}: ${remainder}`)
                bags = kids = totalCandies = null;
            }
        }          
        
    }
}
const readline = require('readline');
let rl = readline.createInterface(process.stdin, process.stdout);

// Read the input data and run all test cases.
const lines = [];
rl.on('line', line => lines.push(line)).on('close', () => runTests(lines));