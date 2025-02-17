import csv from "csvtojson";
import fs from "fs";
import yaml from "js-yaml";
import { XMLParser } from "fast-xml-parser";
class Parsing {
  constructor() {
    this.data = [];
  }

  async csv_parse(filePath) {
    try {
      const rawData = await csv().fromFile(filePath, "utf-8");
      this.data = JSON.parse(JSON.stringify(rawData));
    } catch (err) {
      console.error("Error parsing CSV file:", err);
    }
  }
  async json_parse(filePath) {
    try {
      const rawData =  fs.readFileSync(filePath, "utf-8");
      this.data = JSON.parse(rawData);
    } catch (err) {
      console.error("Error parsing JSON file:", err);
    }
  }

  async txt_parse(filePath) {
    try {
      // \r: beginning of the line
      // \n: end of the line
      // \r\n: end of the line and beginning of the next line
      const rawData = fs.readFileSync(filePath, "utf-8").toString().split("\r\n\r\n");
      // console.log(rawData);
      let data = [];
      rawData.forEach((element) => {
        const obj = {};
        element.split("\r\n").forEach((line) => {
          const [key, value] = line.split("=").map((item) => item.trim());
          obj[key] = value;

        });
        // console.log(obj);
        data.push(obj);
      });
      this.data = data;
     } catch (err) {
      console.error('Error parsing file:', err);
    }
  }

  async yaml_parse(filePath) {
    try {
      const rawData = fs.readFileSync(filePath, "utf-8");
      this.data = yaml.load(rawData);
    }
    catch (err) {
      console.error("Error parsing YAML file:", err);
    }
  }

  async xml_parse(filePath) {
    try {
      const rawData = fs.readFileSync(filePath, "utf-8");
      const parser = new XMLParser();
      const jsonObj = parser.parse(rawData);
      this.data = jsonObj;
    }
    catch (err) {
      console.error("Error parsing XML file:", err);
    }
  }

  get() {
    return this.data;
  }
}

export default Parsing;



