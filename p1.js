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
    let [left, right] = input[line++].split(' ').map((n) => Number(n));
    
    testData.push({testNumber, str: Math.min(left, right)});
  }
  return testData;
}

function runTestCase(data) {   
    l = data.str;   
    let sum = 0;
    while(l) {
      sum += l;
      l--;
    }
  
  // Print the result
  console.log(`Case #${data.testNumber}: ${sum}`);
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
