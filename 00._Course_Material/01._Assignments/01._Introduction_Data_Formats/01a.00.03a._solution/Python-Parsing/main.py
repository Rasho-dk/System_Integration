from utilities.utils import base_path
from fastapi import FastAPI
from modules import *
import os
import requests
# from fastapi.responses import JSONResponse

'''
    OBS: This notebook conatins the solution for the assignment 01a.03a.
    The solution is based on the following requirements:
    - 01a. Create funtions for parsing JSON, XML, YAML, CSV and TXT files.
    - 03a. Create a FastAPI server that returns the parsed data from the files.
    - 03a. Server should interact with the Express server and return the parsed data.
'''

app = FastAPI()
port = 8080
localHost = f"http://127.0.0.1:{port}"

@app.get("/")
def root():
    return {
        "message": "Welcome to the API",
        "endpoints": {
            "/json": "Returns the JSON data from the products.json file",
            "/xml": "Returns the XML data from the products.xml file",
            "/yaml": "Returns the YAML data from the products.yaml file",
            "/csv": "Returns the CSV data from the employees.csv file",
            "/txt": "Returns the Text data from the employees.txt file"
        }
    }


@app.get("/json")
def json_root():
    return parse_json(os.path.join(base_path("Products"), "products.json"))

@app.get("/xml")
def xml_root():
    return parse_xml(os.path.join(base_path("Products"), "products.xml"))

@app.get("/yaml")
def yaml_root():
    return parse_yaml(os.path.join(base_path("Products"), "products.yaml"))

@app.get("/csv")
def csv_root():
    return parse_csv(os.path.join(base_path("Employees"), "employees.csv"))

@app.get("/txt")
def txt_root():
    return parse_txt(os.path.join(base_path("Employees"), "employees.txt"))



# This is section is for the requests from the express server ; 03a.
@app.get('/getXmlRequestDataFromExpress')
def get_xml_request_data_from_express():
    response = requests.get(f"{localHost}/xml")
    json_data = response.json()
    return json_data

@app.get('/getJsonRequestDataFromExpress')
def get_json_request_data_from_express():
    response = requests.get(f"{localHost}/json")
    json_data = response.json()
    return json_data
    


@app.get('/getCsvRequestDataFromExpress')
def get_csv_request_data_from_express():
    response = requests.get(f"{localHost}/csv")
    json_data = response.json()
    return json_data

@app.get('/getYamlRequestDataFromExpress')
def get_yaml_request_data_from_express():
    response = requests.get(f"{localHost}/yaml")
    json_data = response.json()
    return json_data
                        
@app.get('/getTxtRequestDataFromExpress')
def get_txt_request_data_from_express():
    response = requests.get(f"{localHost}/txt")
    json_data = response.json()
    return json_data




''' 
    - This is section is for parsing data; 01a.
    - Code is been imported from the modules folder, which contains the parsing functions.
'''

if __name__ == "__main__":
    # Call functions for products and employees
    # C:\Users\shero\OneDrive - Københavns Erhvervsakademi\System Intergration\01a\Products\products.csv
    base_path = os.path.dirname(__file__)
    products_path = os.path.join(os.path.dirname(__file__), "..", "Products")
    employees_path = os.path.join(os.path.dirname(__file__), "..", "Employees")


    # print(f"JSON Path: {products_path}")

    # print(base_path)
    parse_json(os.path.join(products_path, "products.json"))
    # parse_yaml(os.path.join(products_path, "products.yaml"))
    # parse_xml(os.path.join(products_path, "products.xml"))
    # parse_csv(os.path.join(employees_path, "employees.csv"))
    # parse_txt(os.path.join(employees_path, "employees.txt"))
