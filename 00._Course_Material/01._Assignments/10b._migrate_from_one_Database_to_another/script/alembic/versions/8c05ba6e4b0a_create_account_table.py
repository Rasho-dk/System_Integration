"""create account table

Revision ID: 8c05ba6e4b0a
Revises: 
Create Date: 2025-04-10 07:37:11.316101

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '8c05ba6e4b0a'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
  op.create_table(
        'accounts',
        sa.Column('id', sa.Integer()),
        sa.Column('name', sa.String(length=50), nullable=False),
        sa.Column('description', sa.VARCHAR(200)),
        sa.Column('last_transaction_date', sa.DateTime()),
        sa.PrimaryKeyConstraint('id')
    )


def downgrade() -> None:
    op.drop_table("accounts")
