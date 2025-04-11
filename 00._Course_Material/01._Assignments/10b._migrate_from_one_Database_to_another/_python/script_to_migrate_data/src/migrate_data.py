from sqlalchemy import create_engine, inspect
from dotenv import load_dotenv 
import pandas as pd
import os

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


def get_connection(connection_string: str):
    '''
        Create a connection to the database
        Parameters:
            connection_string: str
                The connection string to connect to the database
        return: Connection object made of the engine    
        Example:
            connection = get_connection(POSTGRES_URL)
    '''
    try:
        # Create a connection to the database
        engine = create_engine(connection_string)
        connection = engine.connect()
        print("Connection to DB successful\n")
        return connection
    except Exception as e: 
        print(f"The error '{e}' occurred")

def read_data(connection, query: str):
    '''
        Read the data from the source database
        Parameters:
            connection: Connection object made of the engine
            query: str that contains the SQL query to be executed
        return: DataFrame object made of the data read from the database
        Example:
            df = read_data(connection, "SELECT * FROM users")
    '''
    try:
        df = pd.read_sql(query, connection)
        print("Data read from DB successful\n")
        return df
    except Exception as e:
        print(f"The error '{e}' occurred")

def write_data(connection, df: pd.DataFrame, table_name: str):
    '''
        Write the data to the destination database
        Parameters:
            connection: Connection object made of the engine
            df: DataFrame object made of the data to be written to the database
            table_name: str that contains the name of the table to be written to
        return: None
        Example:
            write_data(connection, df, "users")
    '''

    try:
        df.to_sql(table_name, connection, if_exists='append', index=False)
        print(f"Data successfully written to the '{table_name}' table.")
    except Exception as e:
        print(f"The error '{e}' occurred")

def check_table_exists(connection, table_name: str):
    '''
        Check if the table exists in the current database
        Parameters:
            connection: Connection object made of the engine
            table_name: str that contains the name of the table to be checked
        return: bool; false if the table does not exist, true if it exists
        Example:
            check_table_exists(connection, "users")
    '''
    inspector = inspect(connection)
    return table_name in inspector.get_table_names()

if __name__ == "__main__":

    # migrate_data()
    postgres_connection = get_connection(POSTGRES_URL)
    mysql_connection = get_connection(MYSQL_URL)

    # for loop to the table that will be migrated
    table_names = ["products", "users"]
    for table_name in table_names:
        # Read data from PostgreSQL
        query = f"SELECT * FROM {table_name}"

        postgres_df = read_data(postgres_connection, query)
        print("======Data read from PostgreSQL DB======\n")
        # print(postgres_df.head())
        print("\n")

        print("======Data migrated to MySQL DB======\n")

        # Assert if the table exists in MySQL
        assert check_table_exists(mysql_connection, table_name), f"Table '{table_name}' does not exist in the MySQL database."

        mysql_connection = get_connection(MYSQL_URL)
        # inspector = inspect(mysql_connection)
        # print(f"Tables in MySQL database: {inspector.get_columns(table_name)}\n")

        # Write data to MySQL
        write_data(connection= mysql_connection, df= postgres_df, table_name= table_name)

    print("======Connections closed======\n")
    # Close the connections
    mysql_connection.close()
    postgres_connection.close()
    print("Connections closed successfully!")