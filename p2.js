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
    const linkedList = new Map();  
    testData.push({testNumber, blocks, questions, chars, limits, linkedList});
  }
  return testData;
}

function checkPalindrome(str, linkedList, [start, end], chars) {
    let len = str.length;
    if (len <= 1) {
        return true;
    }
    let dict = new Map();
    let list = linkedList.get(start);
    let cnt = false;
    if (list && list.has(end)) {
        dict = list.get(end);              
    } else {
        if (!list) {
         linkedList.set(start, new Map());        
        }  else {
            const max = Math.max(...Array.from(list.keys()));
            if (end > max) {
                str = str.slice(max-end);
                dict = list.get(max);                
            } else {
                const substr = chars.slice(end, max);
                const dict = new Map(Array.from(list.get(max).entries()));
                for (l of substr){
                    dict.set(l, dict.get(l)-1);
                }
                cnt = true;
            }
        }

        if(!cnt) {
            for (let char of str) {       
                if (!dict.has(char)) {
                    dict.set(char, 0);
                }
                dict.set(char, dict.get(char)+1);                
            }
        } 

        linkedList.get(start).set(end, dict);
    } 

    const odds = Array.from(dict.values()).filter((v) => v%2);
    if (odds.length > 1) {
        return false;
    }
    if (odds.length == 1 && (len%2) ) {
        return true;
    }
    if (!odds.length && !(len%2)){
        return true;
    }
    return false;
}


function runTestCase(data) {
    let yes = 0;
    
    for (let [start, end] of data.limits) {
        let substr = data.chars.substring(start-1, end);        
        if (checkPalindrome(substr, data.linkedList, [start, end], data.chars)) {
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
