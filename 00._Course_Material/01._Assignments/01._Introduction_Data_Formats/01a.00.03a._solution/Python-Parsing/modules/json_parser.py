import json

# Parse JSON
def parse_json(file):
    with open(file, 'r') as f:
        data = json.load(f)
    print(f"JSON Data from {file}:", data)
    return { "data": data }