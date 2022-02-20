#!/usr/bin/env node


// echo '#!/usr/bin/env node' >> cli.js


// ./cli.js
// ./cli.js input with input

const [,, ...args] = process.argv; // when we pass input

// ./cli.js '2
// 7 3
// 1 2 3 4 5 6 7
// 5 10
// 7 7 7 7 7'
if (args && args.length) {
    for (let arg of args) {
        const chunks = arg.split('\n').filter((val) => !!val);
        run(chunks);
    }
} else {
    // ./cli.js < sampl1.txt
    process.stdin.on('readable', (_) =>  {
        let input;
        while(null !== (input = process.stdin.read()) ) {
             input = input.toString();
             const chunks = input.split('\n').filter((val) => !!val);
             run(chunks);
         }
     });
}

function run(chunks) {
    const [num_cases, ...inputs] = chunks;
        for(let i = 0; i < Number(num_cases); i++) {
            let input1 = inputs.shift();
            let input2 = inputs.shift();
            processCase(i+1, input1, input2);        
        }
}

function processCase(caseNum, input1, input2) {
    let [num_candy_bags, num_kids] = input1.split(' ')
    .map((it) => Number(it));
    let candy_counts = input2.split(' ')
    .map((it) => Number(it));        
    let total_candy = 0;
    let i = 0;
    while (num_candy_bags) {
        total_candy += candy_counts[i];
        i++;
        num_candy_bags--;
    }
    amount_remaining = total_candy % num_kids;
    process.stdout.write(`Case #${caseNum}: ${amount_remaining}\n`);
}





// 2. Method: read input from give .txt file
// ./cli.js sampl1.txt

// Make sure we got a filename on the command line.
// if (process.argv.length < 3) {
//     console.log('Usage: node ' + process.argv[1] + ' FILENAME');
//     process.exit(1);
//   }
//   // Read the file and print its contents.
// const fs = require('fs')
// , filename = process.argv[2];
// fs.readFile(filename, 'utf8', function(err, data) {
//     if (err) throw err;
//     console.log('OK: ' + filename);
//     console.log(data)
// });


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
        problem.T = Number(line)
      } else {
        // TODO process the rest of the data
        const [a, b] = line.split(' ')
        const aNum = Number(a)
        const bNum = Number(b)
  
        problem.testCases.push([aNum, bNum])
      }
    })
  
    .on('close', () => {
      // Finished processing input, now solve question
      solveProblem(problem)
      process.exit()
    })
  }
  
//   readInput()
