
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

function  buildPairs (s1, s2, pairs) {
    pairs.push([s1, s2]);
    while (s1.length) {
        s2 = s1.slice(-1) + s2;
        s1 = s1.slice(0,-1);
        pairs.push([s1, s2]);
    }
    return pairs;
}

function runTestCase(data) {
    let isSpell = "Nothing.";

    let str = data.spell;
    let str2 = '';
    let str3 = '';
    let str4 = '';
    let str5 = '';

   
    let res = [];
    for ([index, [s1,s2]] of buildPairs(str, str2, []).entries()) {
        for (let el of buildPairs(s2, str3,[])) {
            res.push([s1, ...el])
        }
    }

  
    let res2 = [];
    for ([index, [s1,s2,s3]] of res.entries()) {        
        for (let el of buildPairs(s3,str4,[])) {
            res2.push([s1,s2, ...el])
        }
    }

    res = [];
    let res3 = [];
    for ([index, [s1,s2,s3,s4]] of res2.entries()) {
        for (let el of buildPairs(s4,str5,[])) {
            res3.push([s1,s2,s3, ...el])
        }
    }
    
    res2 = [];
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    let l = res3.filter(([s1,s2,s3,s4,s5]) => { 

        // start and end words should be the same
        if (!s2 || (s2 !== s4)) {
            return false;
        }

        let totalVowels = 0;
        let notVowels = 0;

        for (let s of s2) {
            if (vowels.includes(s)){
                totalVowels += 1; 
            } else {
                notVowels += 1;
            }
        }

        // at least 2 syllables = at least 2 vowels
        if (totalVowels < 2) {
            return false;
        }       

        if ((!s1.length && s5.length) || (s1.length && !s5.length)) {
            return false;
        }

        return true;
        
    });
    
    if (l.length) {
        isSpell = 'Spell!';
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




