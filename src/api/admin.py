  
import os
from flask_admin import Admin
from .models import db, User, Employee, InterventionType, StatusValue, TicketEmployersRelation, Ticket, Customer, Occurrence, Machine, Tag, TagOccurrence, Malfunction, Solution
from flask_admin.contrib.sqla import ModelView

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Employee, db.session))
    admin.add_view(ModelView(InterventionType, db.session))
    admin.add_view(ModelView(StatusValue, db.session))
    admin.add_view(ModelView(TicketEmployersRelation, db.session))
    admin.add_view(ModelView(Ticket, db.session))
    admin.add_view(ModelView(Customer, db.session))
    admin.add_view(ModelView(Occurrence, db.session))
    admin.add_view(ModelView(Machine, db.session))
    admin.add_view(ModelView(Tag, db.session))
    admin.add_view(ModelView(TagOccurrence, db.session))
    admin.add_view(ModelView(Malfunction, db.session))
    admin.add_view(ModelView(Solution, db.session))

    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))