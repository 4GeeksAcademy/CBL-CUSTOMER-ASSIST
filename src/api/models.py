from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    user_type_id = db.Column(db.Integer, db.ForeignKey('user_type.id'), nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=True)

    def serialize(self):
        return {
            'id': self.id,
            'email': self.email,
            'password': self.password,
            'user_type_id': self.user_type_id,
            'user_type': self.user_type.type,
            'customer_id': self.customer_id,
            'employee_id': self.employee_id
        }

class UserType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    user = db.relationship('User', backref='user_type')

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    available = db.Column(db.Boolean,nullable=False)
    user = db.relationship('User', backref='employee', uselist=False)
    ticket_employee = db.relationship('TicketEmployeesRelation', backref='employee')
    observations = db.relationship('EmployeeTicketObservation', backref='employee')

    def serialize(self):
        return {
            'id': self.id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            
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
    user = db.relationship('User', backref='customer', uselist=False)
    tickets = db.relationship('Ticket', backref='customer')
    machines = db.relationship('Machine', backref='customer')

    def serialize(self):
        return {
            'customer_info': {
                'id': self.id,
                'company_name': self.company_name,
                'phone': self.phone,
                'contact_person': self.contact_person,
                'address_1': self.address_1,
                'address_2': self.address_2,
                'zipcode': self.zipcode,
                'city': self.city
            }
        }


class TicketEmployeesRelation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ticket_id = db.Column(db.Integer, db.ForeignKey('ticket.id'), nullable=False)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    start_intervention_date = db.Column(db.DateTime)
    end_intervention_date = db.Column(db.DateTime)

class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)
    machine_id = db.Column(db.Integer, db.ForeignKey('machine.id'), nullable=False)
    status = db.Column(db.String(30), nullable=False)
    intervention_type = db.Column(db.Boolean, nullable=True)
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicle.id'), nullable=True)
    open_ticket_time = db.Column(db.DateTime, nullable=False)
    leave_manufacturer_time = db.Column(db.DateTime, nullable=True)
    closed_ticket_time = db.Column(db.DateTime, nullable=True)
    km_on_leave = db.Column(db.Integer, nullable=True)
    km_on_arrival = db.Column(db.Integer, nullable=True)
    ticket_employee_relation = db.relationship('TicketEmployeesRelation', backref='ticket', lazy='dynamic')
    occurrences = db.relationship('Occurrence', backref='ticket')
    customer_description = db.Column(db.String(1024))

    def serialize(self):
        return {
            "id": self.id,
            "open_ticket_time": self.open_ticket_time,
            "machine": self.machine.serialize(),
            "status_id": self.status_id,
            "intervention_type_id": self.intervention_type_id
        }

class Occurrence(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ticket_id = db.Column(db.Integer, db.ForeignKey('ticket.id'), nullable=False)
    malfunction_id = db.Column(db.Integer, db.ForeignKey('malfunction.id'), nullable=False)
    solution_id = db.Column(db.Integer, db.ForeignKey('solution.id'), nullable=True)
    tags_occurrences = db.relationship('TagOccurrence', backref='occurrence')

class Machine(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    serial_number = db.Column(db.String(50), nullable=False)
    model = db.Column(db.String(50), nullable=False)
    im109 = db.Column(db.String(50), nullable=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=True)
    tickets = db.relationship('Ticket', backref='machine')

    def __repr__(self):
        return f"<Machine {self.model}>"

    def serialize(self):
        return {
            "id": self.id,
            "serial_number": self.serial_number,
            "model": self.model,
            "im109": self.im109
        }

class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tag_name = db.Column(db.String(50))
    tags_occurrences = db.relationship('TagOccurrence', backref='tag')

class TagOccurrence(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'), nullable=False)
    occurrence_id = db.Column(db.Integer, db.ForeignKey('occurrence.id'), nullable=False)

class Malfunction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200))
    occurrences = db.relationship('Occurrence', backref='malfunction')

    def serialize(self):
        return {
            "id": self.id,
            "description": self.description
        }

class Solution(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200))
    occurrences = db.relationship('Occurrence', backref='solution')

    def serialize(self):
        return {
            "id": self.id,
            "description": self.description
        }

class Vehicle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    license_plate = db.Column(db.String(20))
    model = db.Column(db.String(50), nullable=True)
    maker = db.Column(db.String(50), nullable=True)
    tickets = db.relationship('Ticket', backref='vehicle')

    def serialize(self):
        return {
            'id':self.id,
            'license_plate': self.license_plate,
            'model' : self.model,
            'maker' : self.maker
        }

class EmployeeTicketObservation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    ticket_id = db.Column(db.Integer, db.ForeignKey('ticket.id'), nullable=False)
    observation = db.Column(db.String(1024), nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'employee_id': self.employee_id,
            'ticket_id': self.ticket_id,
            'observation': self.observation
        }