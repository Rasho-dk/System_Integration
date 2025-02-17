import xml.etree.ElementTree as ET

# Parse XML
def parse_xml(file):
    tree = ET.parse(file)
    root = tree.getroot()
    data = [{child.tag: child.text for child in elem} for elem in root]
    print(f"XML Data from {file}:", data)
    return { "data": data }