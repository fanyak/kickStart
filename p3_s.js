
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
    const spell = input[line++];
    testData.push({testNumber, spell});
  }
  return testData;
}


function runTestCase(data) {
    let isSpell = "Nothing.";
    let vowels = ['a', 'e', 'i', 'o', 'u'];

    let start = {s:null, e:null};
    let middle = null;
    let seg = data.spell; // "frufrumfuffle"

    while (seg.length >= 5) {
        for (let [index,letter] of seg.split('').entries()) {
            if (vowels.includes(letter)) {
                if (start.s === null) {
                    start.s = index;
                } else if (start.e === null) {
                    start.e = index;
                } else {
                    middle = index;
                    break;
                }           
            }
        }
        if (start.s !== null && start.e !== null && middle !== null ) {
            let rest = seg.slice(middle+1);
            if (rest.indexOf(seg.slice(start.s, start.e + 1) ) > -1) {
                isSpell = 'Spell!';
                break;
            } else {      
                seg = seg.slice(start.e);          
                start.s = null;
                start.e = null;
                middle = null;
               
            }
        } else {
            break;
        }
        
    }  
    // Print the result  
    console.log(`Case #${data.testNumber}: ${isSpell}`);
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




