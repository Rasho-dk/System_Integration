# PySpark Data Migration

This project provides a framework for migrating data from a PostgreSQL database to a MySQL database using PySpark. It includes scripts for establishing database connections, reading data from PostgreSQL, transforming it as necessary, and writing it to MySQL.

## Project Structure

```
pyspark-data-migration
├── src
│   ├── migrate_data.py        # Main script for data migration
│   └── utils
│       └── db_connection.py   # Utility functions for database connections
├── requirements.txt           # Project dependencies
└── README.md                  # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd pyspark-data-migration
   ```

2. Install the required dependencies:
   ```
   pip install -r requirements.txt
   ```

## Usage

1. Configure your database connection settings in `src/utils/db_connection.py`.

2. Run the migration script:
   ```
   python src/migrate_data.py
   ```

## Dependencies

- PySpark
- psycopg2 (for PostgreSQL)
- mysql-connector-python (for MySQL)

## License

This project is licensed under the MIT License.




docker exec -it mysql_service  mysql -u myuser -p
docker exec -it <name of container> psql -U myuser -d mydatabase

poetry add pyspark
poetry add psycopg2-binary  # For PostgreSQL
poetry add mysql-connector-python  # For MySQL
poetry add python-dotenv