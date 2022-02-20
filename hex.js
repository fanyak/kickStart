#!/usr/bin/env node


function readInput() {
    const readline = require('readline')
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
      terminal: false
    })
  
    let problem = {
      T: 0,
      testCases: []
    }
  
    rl.on('line', function (line) {
      // TODO: Process input
      if (problem.T === 0) {
        // Get number of test cases from first line
        problem.T = Number(line);
      } else if (new RegExp(/^\d+$/).test(line)) {
            // n = Number(line);
            problem.testCases.push([]);
        } else {
            // TODO process the rest of the data           
            const [currentCase] = problem.testCases.slice(-1);
            const rows = line.split('');
            currentCase.push(rows);
        }
    })  
    .on('close', () => {
      // Finished processing input, now solve question
      solveProblem(problem);
      process.exit();
    });

    function solveProblem(problem) {
       // rl.output.write(`${problem.testCases}`);
       console.log(problem.testCases)
    }
  }
  
readInput();


