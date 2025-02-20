console.log("|=======Start========|")

console.log(new Date()); //UTC time - Standard: ISO 8601 (there T )
// Java, Python, JavaScript support ISO 8601
console.log("|====================|")

console.log(Date()); //local time
console.log("|====================|")

console.log("Unix Epoch: "+ Date.now());  // unix Epoch time
console.log("|====================|")

console.log(new Date().toLocaleString()); // Date without time
const date = new Date();

const danishDate = new Intl.DateTimeFormat('da-DK').format(date); // Danish date
console.log(danishDate);

const americanDate = new Intl.DateTimeFormat('en-US').format(date); // American date
console.log(americanDate);
