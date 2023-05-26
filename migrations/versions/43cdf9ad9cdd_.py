"""empty message

Revision ID: 43cdf9ad9cdd
Revises: 
Create Date: 2023-05-26 12:49:54.370179

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '43cdf9ad9cdd'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('customer',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('company_name', sa.String(length=100), nullable=True),
    sa.Column('email', sa.String(length=100), nullable=True),
    sa.Column('password', sa.String(length=50), nullable=True),
    sa.Column('contact_phone', sa.String(length=20), nullable=True),
    sa.Column('contact_person', sa.String(length=100), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('employee',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('hr_number', sa.Integer(), nullable=True),
    sa.Column('first_name', sa.String(length=50), nullable=True),
    sa.Column('last_name', sa.String(length=50), nullable=True),
    sa.Column('email', sa.String(length=100), nullable=True),
    sa.Column('company_role', sa.String(length=50), nullable=True),
    sa.Column('password', sa.String(length=128), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('intervention_type',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=20), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('malfunction',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=200), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('solution',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=200), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('status_value',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=20), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tag',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tag_name', sa.String(length=50), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('machine',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('serial_number', sa.String(length=50), nullable=False),
    sa.Column('model', sa.String(length=50), nullable=False),
    sa.Column('im109', sa.String(length=50), nullable=True),
    sa.Column('customer_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['customer_id'], ['customer.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('role', sa.String(length=20), nullable=True),
    sa.Column('employee_id', sa.Integer(), nullable=True),
    sa.Column('customer_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['customer_id'], ['customer.id'], ),
    sa.ForeignKeyConstraint(['employee_id'], ['employee.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('ticket',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('customer_id', sa.Integer(), nullable=False),
    sa.Column('machine_id', sa.Integer(), nullable=True),
    sa.Column('status_id', sa.Integer(), nullable=True),
    sa.Column('intervention_type_id', sa.Integer(), nullable=True),
    sa.Column('open_ticket_time', sa.DateTime(), nullable=False),
    sa.Column('leave_manufacturer_time', sa.DateTime(), nullable=True),
    sa.Column('closed_ticket_time', sa.DateTime(), nullable=True),
    sa.Column('vehicle_license_plate', sa.String(length=20), nullable=True),
    sa.Column('km_on_leave', sa.Integer(), nullable=True),
    sa.Column('km_on_arrival', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['customer_id'], ['customer.id'], ),
    sa.ForeignKeyConstraint(['intervention_type_id'], ['intervention_type.id'], ),
    sa.ForeignKeyConstraint(['machine_id'], ['machine.id'], ),
    sa.ForeignKeyConstraint(['status_id'], ['status_value.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('occurrence',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('ticket_id', sa.Integer(), nullable=False),
    sa.Column('malfunction_id', sa.Integer(), nullable=False),
    sa.Column('solution_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['malfunction_id'], ['malfunction.id'], ),
    sa.ForeignKeyConstraint(['solution_id'], ['solution.id'], ),
    sa.ForeignKeyConstraint(['ticket_id'], ['ticket.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('ticket_employers_relation',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('ticket_id', sa.Integer(), nullable=False),
    sa.Column('employee_id', sa.Integer(), nullable=False),
    sa.Column('start_intervention_date', sa.DateTime(), nullable=True),
    sa.Column('end_intervention_date', sa.DateTime(), nullable=True),
    sa.ForeignKeyConstraint(['employee_id'], ['employee.id'], ),
    sa.ForeignKeyConstraint(['ticket_id'], ['ticket.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('tag_occurrence',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('tag_id', sa.Integer(), nullable=False),
    sa.Column('occurrence_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['occurrence_id'], ['occurrence.id'], ),
    sa.ForeignKeyConstraint(['tag_id'], ['tag.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('tag_occurrence')
    op.drop_table('ticket_employers_relation')
    op.drop_table('occurrence')
    op.drop_table('ticket')
    op.drop_table('user')
    op.drop_table('machine')
    op.drop_table('tag')
    op.drop_table('status_value')
    op.drop_table('solution')
    op.drop_table('malfunction')
    op.drop_table('intervention_type')
    op.drop_table('employee')
    op.drop_table('customer')
    # ### end Alembic commands ###
