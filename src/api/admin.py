
import os
from flask_admin import Admin
from .models import db, User, Employee, TicketEmployeeRelation, Ticket, Customer, Knowledge, Machine, Malfunction, Solution, UserType, Ticket_knowledge, Category
from flask_admin.contrib.sqla import ModelView


def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    class Mike(ModelView):
        column_display_pk = True
    # We love nuno
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(Mike(User, db.session))
    admin.add_view(Mike(Employee, db.session))
    admin.add_view(Mike(TicketEmployeeRelation, db.session))
    admin.add_view(Mike(Ticket, db.session))
    admin.add_view(Mike(Customer, db.session))
    admin.add_view(Mike(Knowledge, db.session))
    admin.add_view(Mike(Machine, db.session))
    # admin.add_view(Mike(Tag, db.session))
    # admin.add_view(Mike(TagKnowledge, db.session))
    admin.add_view(Mike(Malfunction, db.session))
    admin.add_view(Mike(Solution, db.session))
    admin.add_view(Mike(Category, db.session))
    admin.add_view(Mike(UserType, db.session))
    admin.add_view(Mike(Ticket_knowledge, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
