import csv


# Parse CSV
def parse_csv(file):
    with open(file, newline='', mode='r') as f:
        reader = csv.DictReader(f)
        data = [row for row in reader]
    print(f"CSV Data from {file}:", data)
    return { "data": data }