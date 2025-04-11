# Run mysql using docker 
``` zsh
docker exec -it mysql_service  mysql -u myuser -p
```
# You are now in the database terminal
## select the database:
``` mysql
USE mydatabase;
```
## Show all tabelse;

``` mysql
SHOW TABLES;
```

## To exit Mysql shell:
``` mysql
EXIT;
```


def upgrade():    
    op.create_table(
        'users',
        sa.Column('id', sa.Integer(), primary_key=True),  
        sa.Column('first_name', sa.String(length=50), nullable=False),
        sa.Column('last_name', sa.VARCHAR(200), nullable=False),
        sa.Column('last_transaction_date', sa.DateTime()),
    )

    op.create_table(
        'products',
        sa.Column('id', sa.Integer(), primary_key=True),  # Added primary key
        sa.Column('name', sa.String(length=200), nullable=False),  # Removed duplicate column
    )


def downgrade():
    op.drop_table("users")
    op.drop_table("products")