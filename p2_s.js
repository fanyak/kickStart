const readline = require('readline');
let rl = readline.createInterface(process.stdin, process.stdout);


function parseInput(input) {
  let line = 0;
  // Read the number of test cases from the first line.
  const numCases = Number(input[line++]);

  const testData = [];
  for (let testNumber = 1; testNumber <= numCases; ++testNumber) {
    // The first line of each test case contains the number of candyBags
    // and the number of kids. The first number isn't needed.
    const [blocks, questions] = input[line++].split(' ').map(n => Number(n));
    const chars = input[line++];
    const limits = [];
    for (let q = 0; q < questions; q++) {
        [start,end] = input[line++].split(' ').map(n => Number(n));
        limits.push([start, end]);
    }
   
    testData.push({testNumber, blocks, questions, chars, limits});
  }
  return testData;
}

function runTestCase(data) {
    let yes = 0;

    // preprocess characters to create a running total of character intances
    seen = (new Array(data.chars.length+1)).fill(null);
    // initialize with zeros for each letter of the alphabet
    state = (new Array(26)).fill(0);
    // we need act to be immutable instance on each iteration 
    // create a structuredClone
    // help because the inputs are not zero-index based
    seen[0] = [...state];
    for ([index, letter] of data.chars.split('').entries()) {
        // increment the count at the position that corresponds to the letter
        // based on the unicode
        state[letter.charCodeAt() - 'A'.charCodeAt()] += 1;
        // save it as *immutable* to record the current state
        seen[index+1] = [...state];        
    }
    
    for (let [start, end] of data.limits) {
        fromState = seen[start-1];
        toState = seen[end];
        odds = 0;
        let i = 0;
        while (i < state.length) {
            if ( (toState[i] - fromState[i]) % 2 ){
                odds++;
            }
            i++;
        }

        if(odds <= 1) {
            yes += 1;
        }
        
    }
    
  // Print the result
  console.log(`Case #${data.testNumber}: ${yes}`);
}

function runAllTests(input) {
  // Parse the input into TestData objects.
  const testCases = parseInput(input);

  // Run each test case.
  testCases.forEach(runTestCase);
}

// Read the input data and run all test cases.
const lines = [];
rl.on('line', line => lines.push(line)).on('close', () => runAllTests(lines));
