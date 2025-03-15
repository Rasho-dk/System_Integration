import json
import yaml
import csv
import xml.etree.ElementTree as ET
import os

# Parse JSON
def parse_json(file):
    with open(file, 'r') as f:
        data = json.load(f)
    print(f"JSON Data from {file}:", data)

# Parse YAML
def parse_yaml(file):
    with open(file, 'r') as f:
        data = yaml.safe_load(f)
    print(f"YAML Data from {file}:", data)

# Parse XML
def parse_xml(file):
    tree = ET.parse(file)
    root = tree.getroot()
    data = [{child.tag: child.text for child in elem} for elem in root]
    print(f"XML Data from {file}:", data)

# Parse CSV
def parse_csv(file):
    with open(file, newline='') as f:
        reader = csv.DictReader(f)
        data = [row for row in reader]
    print(f"CSV Data from {file}:", data)

# Parse Text (Custom Parsing)
def parse_txt(file):
    with open(file, 'r') as f:
        lines = f.readlines()
    data = [dict(item.split(": ") for item in line.strip().split(", ")) for line in lines]
    print(f"Text Data from {file}:", data)

'''
    This section is for testing the functions
    solution for 01a.
'''
if __name__ == "__main__":
    # Call functions for products and employees
    # C:\Users\shero\OneDrive - Københavns Erhvervsakademi\System Intergration\01a\Products\products.csv
    base_path = os.path.dirname(__file__)
    products_path = os.path.join(os.path.dirname(__file__), "..", "Products")
    employees_path = os.path.join(os.path.dirname(__file__), "..", "Employees")


    # print(f"JSON Path: {products_path}")

    # print(base_path)
    # parse_json(os.path.join(products_path, "products.json"))
    # parse_yaml(os.path.join(products_path, "products.yaml"))
    # parse_xml(os.path.join(products_path, "products.xml"))
    parse_csv(os.path.join(employees_path, "employees.csv"))
    # parse_txt(os.path.join(employees_path, "employees.txt"))




    