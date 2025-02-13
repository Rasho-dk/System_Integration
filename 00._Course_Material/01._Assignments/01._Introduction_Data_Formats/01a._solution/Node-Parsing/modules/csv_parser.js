const fs = require("fs");
const { parse } = require("csv-parse");

class CSVParser {
  constructor() {
    this.data = [];
  }

  // consdering using async/await or new Promise() to handle the async nature of the file read
  parse(filePath) {
    fs.createReadStream(filePath)
    .pipe(parse({ delimiter: "," }))
    .on("data", (row) => {
        this.data.push(row);
    })
    .on("end",() =>{
        console.log("CSV Data:", this.data);
    })
    .on("error", (err) => {
        console.error("Error parsing CSV file:", error);
    });
  }

  get() {
    return this.data;
  }
}

export default CSVParser