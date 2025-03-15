import { fileURLToPath } from 'url';
import path from 'path';
import Parsing from './modules/Parsing.js';

// helper function to get the path of a file
function get_path(filename) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    return path.join(__dirname, '..', filename);
}
// end of helper function


const parsing = new Parsing();
async function read_csv_file(selected_file) {
    await parsing.csv_parse(get_path(selected_file));
    const data = parsing.get();
    console.log("Parsed CSV Data:", data);
    return data;
}

async function read_json_file(selected_file) {
    await parsing.json_parse(get_path(selected_file));
    const data = parsing.get();
    console.log("Parsed JSON Data:", JSON.stringify(data));
    return data;
}

async function read_text_file(selected_file) {
    await parsing.txt_parse(get_path(selected_file));
    const data = parsing.get();
    console.log(JSON.stringify(data));
    return data;
    
}

async function read_yaml_file(selected_file) {
    await parsing.yaml_parse(get_path(selected_file));
    const data = parsing.get();
    console.log(JSON.stringify(data));
    return data;
}

async function read_xml_file(selected_file) {
    await parsing.xml_parse(get_path(selected_file));
    const data = parsing.get();
    console.log("Parsed XML Data:", JSON.stringify(data));
    return data;
}


export { read_csv_file, read_json_file, read_text_file, read_yaml_file, read_xml_file };


// read_csv_file('Products/products.csv'); 

// read_json_file('Products/products.json');
// read_text_file('Products/products.txt');
// read_yaml_file('Products/products.yaml');
read_xml_file('Products/products.xml');







// console.log("1" + get_path('Products'));
// // Define __filename and __dirname
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);



// // // To get the filename
// // console.log(`Filename is ${__filename}`);

// // // To get the directory name
// // console.log(`Directory name is ${__dirname}`);

// const path_to_csv = path.join(__dirname, '..', 'Products', 'products.csv');
// console.log("2" + path_to_csv);

// // const csvFilePath = path.join(__dirname, "products.csv");
// // console.log(`CSV file path is ${csvFilePath}`);

// const jsonFilePath = path.join(__dirname, "products.json");
// // console.log(`JSON file path is ${jsonFilePath}`);