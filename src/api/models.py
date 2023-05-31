from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    user_type_id = db.Column(db.Integer, db.ForeignKey('user_type.id'), nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=True)

class UserType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    user= db.relationship('User', backref='user_type')

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    user= db.relationship('User', backref='employee')
    ticket_employee = db.relationship('TicketEmployeesRelation', backref='employee')


class InterventionType(db.Model):
    # __tablename__ = 'intervention_type'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    tickets = db.relationship('Ticket', backref='intervention_type')

    def serialize(self):
        return {"id": self.id, "name": self.name}


class StatusValue(db.Model):
    # __tablename__ = 'status_value'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(20))
    tickets = db.relationship('Ticket', backref='status')


class TicketEmployeesRelation(db.Model):
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
    machine_id = db.Column(db.Integer, db.ForeignKey(
        'machine.id'), nullable=False)
    status_id = db.Column(db.Integer, db.ForeignKey(
        'status_value.id'), nullable=True)
    intervention_type_id = db.Column(db.Integer, db.ForeignKey(
        'intervention_type.id'), nullable=True)
    open_ticket_time = db.Column((db.DateTime), nullable=False)
    leave_manufacturer_time = db.Column((db.DateTime), nullable=True)
    closed_ticket_time = db.Column((db.DateTime), nullable=True)
    vehicle_license_plate = db.Column(db.String(20), nullable=True)
    km_on_leave = db.Column(db.Integer, nullable=True)
    km_on_arrival = db.Column(db.Integer, nullable=True)
    ticket_employee_relation = db.relationship(
        'TicketEmployeesRelation', backref='ticket', lazy='dynamic')
    occurrences = db.relationship('Occurrence', backref='ticket')

    def serialize(self):
        return {
            "id": self.id,
            "open_ticket_time": self.open_ticket_time,
            "machine_id": self.machine_id,
            "status_id": self.status_id,
            "intervention_type_id": self.intervention_type_id
        }


class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    contact_person = db.Column(db.String(20), nullable=True)
    address_1 = db.Column(db.String(100), nullable=False)
    address_2 = db.Column(db.String(100))
    zipcode = db.Column(db.Integer)
    city = db.Column(db.String(50), nullable=False)
    user= db.relationship('User', backref='customer')
    ticket= db.relationship('Ticket',backref='customer')
    machine = db.relationship('Machine',backref='customer')
    
class Occurrence(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ticket_id = db.Column(db.Integer, db.ForeignKey(
        'ticket.id'), nullable=False)
    malfunction_id = db.Column(db.Integer, db.ForeignKey(
        'malfunction.id'), nullable=False)
    solution_id = db.Column(db.Integer, db.ForeignKey(
        'solution.id'), nullable=True)
    tags_occurences = db.relationship('TagOccurrence', backref='occurrence')


class Machine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    serial_number = db.Column(db.String(50), nullable=False)
    model = db.Column(db.String(50), nullable=False)
    im109 = db.Column(db.String(50), nullable=True)
    customer_id = db.Column(db.Integer, db.ForeignKey(
        'customer.id'), nullable=True)
    tickets = db.relationship('Ticket', backref='machine')

    def __repr__(self):
        return f"<Machine {self.model}>"

    def serialize(self):
        return {"id": self.id, "serial_number": self.serial_number, "model": self.model, "im109": self.im109}


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
