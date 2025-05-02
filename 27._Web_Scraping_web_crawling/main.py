import requests 
from bs4 import BeautifulSoup

html = requests.get('https://en.wikipedia.org/wiki/List_of_Monty_Python_projects').text
parsed_html = BeautifulSoup(html, 'lxml')

tags = parsed_html.find("div", {"class": "mw-parser-output"})

projects = {
    "initial_category": []

}

current_catagory = "Initial_Category"

for tag in tags:
    if tag.name == 'h2':
        current_catagory = tag.text.replace("[edit]", "")
        projects[current_catagory] = []
    elif tag.name == "ul":
        for li in tag.find_all('li'):
            # print(li.text)
            projects[current_catagory].append(li.text)


from pprint import pprint
pprint(projects)
