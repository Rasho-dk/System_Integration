"""create users and products tables

Revision ID: dc353164f5fb
Revises: 
Create Date: 2025-04-10 21:22:36.077449

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'dc353164f5fb'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


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
        sa.Column('id', sa.Integer(), primary_key=True), 
        sa.Column("price", sa.Numeric(10, 2), nullable=False),
        sa.Column('name', sa.String(length=200), nullable=False),  
    )

def downgrade():
    op.drop_table("users")
    op.drop_table("products")