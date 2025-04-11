from sqlalchemy import create_engine, inspect
from dotenv import load_dotenv 
import pandas as pd
import os


##########
# this script made for proof of concept as test
##########


# docs :
## https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.DataFrame.to_sql.html 
## https://www.slingacademy.com/article/sqlalchemy-get-list-all-tables/ 
## https://stackoverflow.com/questions/6473925/sqlalchemy-getting-a-list-of-tables#6474046 



# Load .env variables
load_dotenv()

# Set up the MySQL connection string
MYSQL_URL = f"mysql+pymysql://{os.getenv('MYSQL_USER')}:{os.getenv('MYSQL_PASSWORD')}@{os.getenv('MYSQL_HOST')}:3306/{os.getenv('MYSQL_DATABASE')}"

# Set up the PostgreSQL connection string
POSTGRES_URL = f"postgresql+psycopg2://{os.getenv('POSTGRES_USER')}:{os.getenv('POSTGRES_PASSWORD')}@{os.getenv('POSTGRES_HOST')}:5432/{os.getenv('POSTGRES_DB')}"


def migrate_data():
    try:
        # Create a connection to PostgreSQL
        postgres_engine = create_engine(POSTGRES_URL)
        postgres_connection = postgres_engine.connect()
        print("Connection to PostgreSQL DB successful\n")

        # Read ata from PostgreSQL
        query = "SELECT * FROM users"
        postgres_df = pd.read_sql(query, postgres_connection)
        print("Data read from PostgreSQL DB successful\n")
        print(postgres_df.head())
        print("\n")

        # Close the PostgreSQL connection
        postgres_connection.close()

        # Create a connection to MySQL
        mysql_engine = create_engine(MYSQL_URL)
        mysql_connection = mysql_engine.connect()
        print("Connection to MySQL DB successful! \n")

        # Check if the table exists in MySQL
        inspector = inspect(mysql_engine)
        if 'users' not in inspector.get_table_names():
            print("Error: Table 'users' does not exist in the MySQL database.")
            return

        # Write data to MySQL
        postgres_df.to_sql('users', mysql_connection, if_exists='append', index=False)
        print("Data mirgrated to MySQL DB successful! \n")


        # Close the MySQL connection
        mysql_connection.close()

    except Exception as e:
        print(f"An error occurred: {e}")




'''
# # test the connection for mysql
# try:
#     # Create a connection to the database
#     engine = get_connection()
#     connection = engine.connect()
#     print("Connection to MySQL DB successful\n")
#     # read the data from the source database
#     df = pd.read_sql("SELECT * FROM users", connection)
#     df.head()
# except Exception as e: 
#     print(f"The error '{e}' occurred")

# test the connection for postgres
# try:
#     # Create a connection to the database
#     # print(POSTGRES_URL)
#     print("##########")
#     engine = create_engine(url = POSTGRES_URL)
#     connection = engine.connect()
#     print("Connection to PostgreSQL DB successful\n")
#     # read the data from the source database
#     df = pd.read_sql("SELECT * FROM users", connection)
#     print(df.head())
# except Exception as e: 
#     print(f"The error '{e}' occurred")
'''