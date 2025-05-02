// fs: file system
import fs from 'fs';

// const response = await fetch("https://www.proshop.dk/Baerbar")
// const result = await response.text();

// // to create a index.html file
// fs.writeFileSync('index.html', result);

import { load } from 'cheerio';

// utf-8 : To remove buffter and show as string we use utf-8
const page = await fs.readFileSync('index.html', "utf-8");

console.log(page);

const $ = load(page);
$("#products [product]").each((index, element) => {
    console.log(element)
    const name = $(element).find(".site-product-link").text();
    console.log(name);

    const price = $(element).find(".site-currency-lg").text();
    console.log(price);

    console.log(price, name.trim());
})
