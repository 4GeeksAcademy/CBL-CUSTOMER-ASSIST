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
    user = db.relationship('User', back_populates='employee', uselist=False)
    tickets = db.relationship('TicketEmployersRelation', back_populates='employee', lazy='dynamic')


class InterventionType(db.Model):
    # __tablename__ = 'intervention_type'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))


class StatusValue(db.Model):
    # __tablename__ = 'status_value'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))


class TicketEmployersRelation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ticket_id = db.Column(db.Integer, db.ForeignKey('ticket.id'), nullable=False)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    start_intervention_date = db.Column(db.DateTime)
    end_intervention_date = db.Column(db.DateTime)
    ticket = db.relationship('Ticket', back_populates='technicians')
    employee = db.relationship('Employee', foreign_keys=[employee_id])

    @property
    def role(self):
        return self.employee.company_role


class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)
    machine_id = db.Column(db.Integer, db.ForeignKey('machine.id'), nullable=False)
    status_id = db.Column(db.Integer, db.ForeignKey('status_value.id'), nullable=False)
    open_ticket_time = db.Column(db.DateTime)
    intervention_type_id = db.Column(db.Integer, db.ForeignKey('intervention_type.id'), nullable=False)
    leave_manufacturer_time = db.Column(db.DateTime)
    closed_ticket_time = db.Column(db.DateTime)
    vehicle_license_plate = db.Column(db.String(20))
    km_on_leave = db.Column(db.Integer)
    km_on_arrival = db.Column(db.Integer)
    status = db.relationship('StatusValue', back_populates='tickets')
    intervention_type = db.relationship('InterventionType', back_populates='tickets')
    technicians = db.relationship('TicketEmployersRelation', back_populates='ticket', lazy='dynamic')
    machine = db.relationship('Machine', back_populates='tickets')
    customer = db.relationship('Customer', back_populates='tickets')
    occurrences = db.relationship('Occurrence', back_populates='ticket')


class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(100))
    email = db.Column(db.String(100))
    contact_phone = db.Column(db.String(20))
    contact_person = db.Column(db.String(100))
    user = db.relationship('User', back_populates='customer', uselist=False)
    machines = db.relationship('Machine', back_populates='customer')


class Occurrence(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ticket_id = db.Column(db.Integer, db.ForeignKey('ticket.id'), nullable=False)
    malfunction_id = db.Column(db.Integer, db.ForeignKey('malfunction.id'), nullable=False)
    solution_id = db.Column(db.Integer, db.ForeignKey('solution.id'), nullable=False)
    ticket = db.relationship('Ticket', back_populates='occurrences')
    tags = db.relationship('TagOccurrence', back_populates='occurrence')
    malfunction = db.relationship('Malfunction', back_populates='occurrences')
    solution = db.relationship('Solution', back_populates='occurrences')


class Machine(db.Model):
    serial_number = db.Column(db.String(50), primary_key=True)
    model = db.Column(db.String(50))
    im109 = db.Column(db.String(50))
    customed_id = db.Column(db.Integer)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)
    customer = db.relationship('Customer', back_populates='machines')


class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tag_name = db.Column(db.String(50))
    occurrences = db.relationship('TagOccurrence', back_populates='tag')


class TagOccurrence(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'), nullable=False)
    occurrence_id = db.Column(db.Integer, db.ForeignKey('occurrence.id'), nullable=False)
    tag = db.relationship('Tag', back_populates='occurrences')
    occurrence = db.relationship('Occurrence', back_populates='tags')

class Malfunction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200))
    occurrences = db.relationship('Occurrence', back_populates='malfunction')


class Solution(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200))
    occurrences = db.relationship('Occurrence', back_populates='solution') 