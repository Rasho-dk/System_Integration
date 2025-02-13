#nodemon --exec python main.py
    # det her til at køre python filen med nodemon
    # .env bliver ikke pushet til github
    # man kan defindere .env.tamplate så andre udvirlere ved hvad der bruges. 
from dotenv import load_dotenv
import os

# OR
from dotenv import dotenv_values

# load_dotenv()
print(os.getenv("API_KEY"))


#OR 

# confiq = dotenv_values(".env")
# print(confiq["API_KEY"])

# alle miljø variabler
print(os.environ)

