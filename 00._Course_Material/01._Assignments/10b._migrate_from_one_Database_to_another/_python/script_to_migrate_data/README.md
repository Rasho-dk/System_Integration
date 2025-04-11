# Data Migration Script

This project provides a Python-based framework for migrating data from a PostgreSQL database to a MySQL database using SQLAlchemy and Pandas. It includes scripts for establishing database connections, reading data from PostgreSQL, and writing it to MySQL.

## Project Structure

```
data-migration
├──_python
│   ├──alembic                   # Python SQL tookit and ORM to create migration
│   ├── src
│      ├── migrate_data.py       # Main script for data migration
└── README.md                    # Project documentation
```

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd data-migration
   ```

2. **Install Dependencies Using Poetry**:
   Ensure `poetry` is installed on your system. If not, install it:
   ```bash
   curl -sSL https://install.python-poetry.org | python3 -
   ```

   Then, install the project dependencies:
   ```bash
   poetry install
   ```

3. **Configure Environment Variables**:
   Create a `.env` file in the root directory and add your database connection details:
   ```
   MYSQL_DATABASE=mydatabase
   MYSQL_USER=myuser
   MYSQL_PASSWORD=mypassword
   MYSQL_HOST=localhost

   POSTGRES_DB=mydatabase
   POSTGRES_USER=myuser
   POSTGRES_PASSWORD=mypassword
   POSTGRES_HOST=localhost
   ```

4. **Ensure Database Tables Exist**:
   Make sure the required tables (`products`, `users`, etc.) exist in both PostgreSQL and MySQL databases.

## Usage

1. **Activate the Poetry Environment**:
   ```bash
   poetry shell
   ```

2. **Run the Migration Script**:
   Execute the script to migrate data:
   ```bash
   python src/migrate_data.py
   ```

3. **Monitor Output**:
   The script will display logs indicating the progress of the migration, including successful reads and writes.

## Dependencies

The project uses the following dependencies:
- **SQLAlchemy**: For database connections and operations.
- **Pandas**: For reading and writing data.
- **psycopg2**: For connecting to PostgreSQL.
- **mysql-connector-python**: For connecting to MySQL.
- **python-dotenv**: For managing environment variables.

These dependencies are managed by `poetry` and are listed in the `pyproject.toml` file.

## Additional Notes

- **Docker Commands**:
  - Access MySQL:
    ```bash
      docker exec -it mysql_service  mysql -u myuser -p
    ```
  - Access PostgreSQL:
    ```bash
    docker exec -it <container_name> psql -U myuser -d mydatabase
    ```

- **Schema Matching**:
  Ensure that the schemas of the tables in PostgreSQL and MySQL match to avoid migration errors.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.



docker exec -it mysql_service  mysql -u myuser -p
docker exec -it <name of container> psql -U myuser -d mydatabase

poetry add pyspark
poetry add psycopg2-binary  # For PostgreSQL
poetry add mysql-connector-python  # For MySQL
poetry add python-dotenv