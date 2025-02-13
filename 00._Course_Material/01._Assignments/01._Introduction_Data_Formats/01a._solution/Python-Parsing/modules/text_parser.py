# Parse Text (Custom Parsing)
def parse_txt(file):
    with open(file, 'r') as f:
        lines = f.readlines()
    data = [dict(item.split(": ") for item in line.strip().split(", ")) for line in lines]
    print(f"Text Data from {file}:", data)
    return { "data": data }