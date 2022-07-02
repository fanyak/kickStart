function  buildPairs (s1, s2, pairs) {
    pairs.push([s1, s2]);
    while (s1.length) {
        s2 = s1.slice(-1) + s2;
        s1 = s1.slice(0,-1);
        pairs.push([s1, s2]);
    }
    return pairs;
}
let str = "abracadabra";
let res;
let start = buildPairs(str, '', []);
while (start[0].length < 5) {
    res = [];
    for ([index, state] of start.entries()) {
        for (let [_, n] of buildPairs(state.at(-1), '', [])) {
            res.push([...state, n])
        }
        start = res;
    }
}
console.log(res)