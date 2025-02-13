import yaml

# Parse YAML
def parse_yaml(file):
    with open(file, 'r') as f:
        data = yaml.safe_load(f)
    print(f"YAML Data from {file}:", data)
    return { "data": data }