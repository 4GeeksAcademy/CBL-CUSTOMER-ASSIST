from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(20))
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'))
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'))


class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    hr_number = db.Column(db.Integer)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    company_email = db.Column(db.String(100))
    company_role = db.Column(db.String(50))
    password = db.Column(db.String(128))
    user = db.relationship('User', backref='employee', uselist=False)
    tickets = db.relationship(
        'TicketEmployersRelation', backref='employee', lazy='dynamic')


class InterventionType(db.Model):
    # __tablename__ = 'intervention_type'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    tickets = db.relationship('Ticket', backref='intervention_type')


class StatusValue(db.Model):
    # __tablename__ = 'status_value'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    tickets = db.relationship('Ticket', backref='status')


class TicketEmployersRelation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ticket_id = db.Column(db.Integer, db.ForeignKey(
        'ticket.id'), nullable=False)
    employee_id = db.Column(db.Integer, db.ForeignKey(
        'employee.id'), nullable=False)
    start_intervention_date = db.Column(db.DateTime)
    end_intervention_date = db.Column(db.DateTime)

    # @property
    # def role(self):
    #     return self.employee.company_role


class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey(
        'customer.id'), nullable=False)
    machine_serial_number = db.Column(db.String(50), db.ForeignKey(
        'machine.serial_number'), nullable=False)
    status_id = db.Column(db.Integer, db.ForeignKey(
        'status_value.id'), nullable=False)
    intervention_type_id = db.Column(db.Integer, db.ForeignKey(
        'intervention_type.id'), nullable=False)
    open_ticket_time = db.Column(db.DateTime)
    leave_manufacturer_time = db.Column(db.DateTime)
    closed_ticket_time = db.Column(db.DateTime)
    vehicle_license_plate = db.Column(db.String(20))
    km_on_leave = db.Column(db.Integer)
    km_on_arrival = db.Column(db.Integer)
    ticket_employee_relation = db.relationship(
        'TicketEmployersRelation', backref='ticket', lazy='dynamic')
    occurrences = db.relationship('Occurrence', backref='ticket')


class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    password = db.Column(db.String(50))
    contact_phone = db.Column(db.String(20))
    contact_person = db.Column(db.String(100))
    user = db.relationship('User', backref='customer', uselist=False)
    machines = db.relationship('Machine', backref='customer')
    tickets = db.relationship('Ticket', backref='customer')


class Occurrence(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ticket_id = db.Column(db.Integer, db.ForeignKey(
        'ticket.id'), nullable=False)
    malfunction_id = db.Column(db.Integer, db.ForeignKey(
        'malfunction.id'), nullable=False)
    solution_id = db.Column(db.Integer, db.ForeignKey(
        'solution.id'), nullable=False)
    tags_occurences = db.relationship('TagOccurrence', backref='occurrence')


class Machine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    serial_number = db.Column(db.String(50),nullable=False)
    model = db.Column(db.String(50), nullable=False)
    im109 = db.Column(db.String(50), nullable=True)
    customer_id = db.Column(db.Integer, db.ForeignKey(
        'customer.id'), nullable=True)
    tickets = db.relationship('Ticket', backref='machine')


class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tag_name = db.Column(db.String(50))
    tags_occurences = db.relationship('TagOccurrence', backref='tag')


class TagOccurrence(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'), nullable=False)
    occurrence_id = db.Column(db.Integer, db.ForeignKey(
        'occurrence.id'), nullable=False)


class Malfunction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200))
    occurrences = db.relationship('Occurrence', backref='malfunction')


class Solution(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200))
    occurrences = db.relationship('Occurrence', backref='solution')
