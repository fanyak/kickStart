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
       console.log(problem.testCases);
       const testCase = problem.testCases[5].map((row) => [...row]); // create a copy
       const directions = [ [-1,0], [0,-1], [0,1], [1,0] ]; // check adjusent cells to see if there is a continuous path
       let possiblePaths = [];

       function traverse(testCase, start=[0,0], path=[]) {      
        const [r,c] = start;
        // base case
        if(c === testCase.length-1) {
          if(testCase[r] && testCase[r][c] === 'B') {
            path.push([r,c]);
          } return path;
        }
        if( 0 <= r && r < testCase.length && 0 <= c && c < testCase.length) {
          const cp = testCase.map((row) => [...row]);
          if(cp[r][c] === 'B') {
            cp[r][c] = 'b';
            path.push([r,c]);
            for (let d of directions) {
              const newPath = path.map((pt) => [...pt]);
              const [row, col] = d;
              const newRow = r+row;
              const newCol = c+col;
              const p = traverse(cp, [newRow, newCol], newPath);
              if(p) {
                possiblePaths.push(p);
              }
            }          
          }       
        }       
    }
    for(let i = 0; i < testCase.length; i++) {
      traverse(testCase, [i,0]);
    }
    possiblePaths = possiblePaths.filter((p)=> !!p && p.slice(-1).find(([row,col]) => col === testCase.length-1));
    // console.log(possiblePaths);
    
    //////////////////////////// CHECK if the resulting board was possible ///////////////////////////////////////////////////////////
    // we only need to check against any 1 path !!!!!!!!!!!!!!!!!!!!
     // If there is another path that doesn't intersect at all with the 1 path, then it is impossible

    let realizedPaths = possiblePaths.map(path => path.map(p => p.join()) ); // O(n)
    const [realizedPath] = realizedPaths; // O(1)
    realizedPaths = realizedPaths.filter((path) => !path.find(p => realizedPath.includes(p) ) ); // O(n*(path.length+path.length))
    if (realizedPaths.length) {
      rl.output.write('impossible');
    }
  }// end of solveProblem


}
  
readInput();


