import express from 'express';
import * as myModule from './index.js';

// initialize express
const app = express();
const PORT = 8080;
/*
    * This function is used to fetch data from FastAPI server
 */
const FastApiPort = 8000;
const localHost = `http://127.0.0.1:${FastApiPort}`; 

app.get('/getJsonDataFromFastAPI', async (req, res) => {
    const response = await fetch(`${localHost}/json`);
    const jsonData = await response.json();
    res.send({data: jsonData});
});

app.get('/getXmlDataFromFastAPI', async (req, res) => {
    const response = await fetch(`${localHost}/xml`);
    const xmlData = await response.json();
    res.send({data: xmlData});
});

app.get('/getCsvDataFromFastAPI', async (req, res) => {
    const response = await fetch(`${localHost}/csv`);
    const csvData = await response.json();
    res.send({data: csvData});
});

app.get('/getYamlDataFromFastAPI', async (req, res) => {
    const response = await fetch(`${localHost}/yaml`);
    const yamlData = await response.json();
    res.send({data: yamlData});
}); 

app.get('/getTxtDataFromFastAPI', async (req, res) => {
    const response = await fetch(`${localHost}/txt`);
    const txtData = await response.json();
    res.send({data: txtData});
});  
   
/*
    * This endpoint is used to get data from local files using node.js
 */
app.get('/xml', async (req, res) => {
    const xmlData = await  myModule.read_xml_file('Products/products.xml');
    res.send({xmlData: xmlData});
});

app.get('/json', async (req, res) => {
    const jsonData = await myModule.read_json_file('Products/products.json');
    res.send({jsonData: jsonData});
});

app.get('/csv', async (req, res) => {
    const csvData = await myModule.read_csv_file('Products/products.csv');
    res.send({csvData: csvData});
});

app.get('/yaml', async (req, res) => {
    const yamlData = await myModule.read_yaml_file('Products/products.yaml');
    res.send({yamlData: yamlData});
});
 
app.get('/txt', async (req, res) => {
    const txtData = await myModule.read_text_file('Products/products.txt');
    res.send({txtData: txtData});
    
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));



