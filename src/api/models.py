from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    active = db.Column(db.Boolean, default=True, nullable=False)
    user_type_id = db.Column(db.Integer, db.ForeignKey('user_type.id'), nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "password": self.password,
            "active": self.active,
            "user_type_id": self.user_type_id,
            "user_type": self.user_type.type,
            "customer_id": self.customer_id,
            "employee_id": self.employee_id
        }
    
    def serialize_admin(self):
         
        data = {
            "id": self.id,
            "email": self.email,
            "active": self.active,
            "user_type_id": self.user_type_id,
            "user_type": self.user_type.type,
            "customer_id": self.customer_id,
            "employee_id": self.employee_id
        }
        if self.customer :
            data["company_name"] = self.customer.company_name 
        return data

class UserType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    user = db.relationship('User', backref='user_type', uselist=False)

class Employee(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    available = db.Column(db.Boolean,nullable=False)
    user = db.relationship('User', backref='employee', uselist=False)
    tickets = db.relationship('TicketEmployeeRelation', backref='employee', uselist=False)
    observations = db.relationship('EmployeeTicketObservation', backref='employee', uselist=False)

    def serialize(self):
        return {
            "id": self.id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "available": self.available
        }

class Customer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    company_name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    contact_person = db.Column(db.String(20), nullable=True)
    address_1 = db.Column(db.String(100), nullable=False)
    address_2 = db.Column(db.String(100))
    zipcode = db.Column(db.Integer)
    company_email = db.Column(db.String(25), nullable=True)
    city = db.Column(db.String(50), nullable=False)
    user = db.relationship('User', backref='customer', uselist=False)
    tickets = db.relationship('Ticket', backref='customer', uselist=False)
    equipments = db.relationship('Equipment', backref='customer', uselist=False)

    def serialize(self):
        return {
            "id": self.id,
            "company_name": self.company_name,
            "phone": self.phone,
            "contact_person": self.contact_person,
            "address_1": self.address_1,
            "address_2": self.address_2,
            "zipcode": self.zipcode,
            "city": self.city,
            "company_email": self.company_email
        }

    def serialize_employee(self):
        return {
            "id": self.id,
            "company_name": self.company_name,
            "phone": self.phone,
            "contact_person": self.contact_person,
            "address_1": self.address_1,
            "address_2": self.address_2,
            "zipcode": self.zipcode,
            "city": self.city,
            # "company_email": self.company_email,
            "customer_email": self.user.email
        }


class TicketEmployeeRelation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    ticket_id = db.Column(db.Integer, db.ForeignKey('ticket.id'), nullable=False)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    start_intervention_date = db.Column(db.DateTime)
    end_intervention_date = db.Column(db.DateTime)

    def serialize(self):
        return {
            "id": self.id,
            "ticket_id": self.ticket_id,
            "employee_id": self.employee_id,
            "start_intervention_date": self.start_intervention_date,
            "end_intervention_date": self.end_intervention_date
        }

    def serialize_employee(self):
        return self.ticket.serialize_employee()
    

class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    status = db.Column(db.String(30), nullable=False)
    intervention_type = db.Column(db.Boolean, nullable=True)
    open_ticket_time = db.Column(db.DateTime, nullable=False)
    leave_manufacturer_time = db.Column(db.DateTime, nullable=True)
    closed_ticket_time = db.Column(db.DateTime, nullable=True)
    km_on_leave = db.Column(db.Integer, nullable=True)
    km_on_arrival = db.Column(db.Integer, nullable=True)
    subject = db.Column(db.String(30), nullable=False)
    description = db.Column(db.String(1024), nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=False)
    equipment_id = db.Column(db.Integer, db.ForeignKey('equipment.id'), nullable=False)
    vehicle_id = db.Column(db.Integer, db.ForeignKey('vehicle.id'), nullable=True)
    ticket_knowledge = db.relationship('TicketKnowledge', backref='ticket')
    employees = db.relationship('TicketEmployeeRelation', backref='ticket', uselist=False)
    observations = db.relationship('EmployeeTicketObservation', backref='ticket', uselist=False)


    def serialize(self):
        return {
            "id": self.id,
            "open_ticket_time": self.open_ticket_time,
            "equipment": self.equipment.serialize(),
            "status": self.status,
            "intervention_type": self.intervention_type,
            "subject": self.subject,
            "description": self.description,
            "customer_id": self.customer_id,
            "company_name": self.customer.company_name
        }

    def serialize_cus(self):
        return {
            "id": self.id,
            "open_ticket_time": self.open_ticket_time,
            "equipment": self.equipment.serialize(),
            "status": self.status,
            "intervention_type": self.intervention_type,
            "subject": self.subject,
            "description": self.description,
            "customer_id": self.customer_id,
            "company_name": self.customer.company_name,
            "knowledge" : [knowledge.serialize() for knowledge in self.ticket_knowledge] if self.ticket_knowledge else []
        }

    def serialize_employee(self):
        return {
            "ticket": {
                "id": self.id,
                "status": self.status,
                "intervention_type": self.intervention_type,
                "subject": self.subject,
                "description": self.description
            },
            "customer": self.customer.serialize_employee(),
            "equipment": self.equipment.serialize_employee()
        }

    def serialize_equipment_knowledge(self):
        # knowledges = [knowledge.serialize_employee() for knowledge in self.ticket_knowledge] if self.ticket_knowledge else []
        return self.id
    
    
class TicketKnowledge(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    knowledge_id = db.Column(db.Integer, db.ForeignKey('knowledge.id'), nullable=True)
    ticket_id = db.Column(db.Integer, db.ForeignKey('ticket.id'), nullable=True)

    def serialize(self):
        knowledge = Knowledge.query.get(self.knowledge_id)
        return {
            "id": self.id,
            "knowledge" : knowledge.serialize_full() if knowledge else None
        }

    def serialize_employee(self):
        return {
            "id": self.id,
            "category": self.knowledge.category.serialize() if self.knowledge.category else None,
            "malfunction": self.knowledge.malfunction.serialize() if self.knowledge.malfunction else None,
            "solution": self.knowledge.solution.serialize() if self.knowledge.solution else None
        }

class Knowledge(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    malfunction_id = db.Column(db.Integer, db.ForeignKey('malfunction.id'), nullable=False)
    solution_id = db.Column(db.Integer, db.ForeignKey('solution.id'), nullable=True)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=True)
    ticket_knowledge = db.relationship('TicketKnowledge', backref='knowledge', uselist=False)
    
    def serialize(self):
        return {
            "id": self.id,
            "malfunction": self.malfunction.description,
            "solution": self.solution.description,
            "category": self.category.description
        }
    
    def serialize_full(self):

        solution = Solution.query.get(self.solution_id)
        category = Category.query.get(self.category_id)
        malfunction = Malfunction.query.get(self.malfunction_id)
        return {
            "id": self.id,
            "solution" : solution.serialize() if solution else None, 
            "category" : category.serialize()  if category else None, 
            "malfunction" : malfunction.serialize() if malfunction else None
        }

class Equipment(db.Model):
    id = db.Column(db.Integer, primary_key=True)      
    serial_number = db.Column(db.String(50), nullable=False)
    model = db.Column(db.String(50), nullable=False)
    im109 = db.Column(db.String(50), nullable=True)
    equipment_photo = db.Column(db.String(50), nullable=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customer.id'), nullable=True)
    tickets = db.relationship('Ticket', backref='equipment', uselist=False)

    def __repr__(self):
        return f"<Equipment {self.model}>"

    def serialize(self):
        return {
            "id": self.id,
            "customer_id" : self.customer_id,
            "serial_number": self.serial_number,
            "model": self.model,
            "im109": self.im109,
            "equipment_photo": self.equipment_photo
        }
    
    def serialize_employee(self):
        # tickets = Ticket.query.filter_by(equipment_id = self.id).all()
        # knowledge = [knowledge.serialize_equipment_knowledge() for knowledge in tickets] if tickets else []
        # print("############################")
        # print(knowledge)
        # print("$$$$$$$$$$$$$$$$$$$$$$$$$$")
        return {
            "id": self.id,
            "serial_number": self.serial_number,
            "model": self.model,
            "im109": self.im109
        }


class Malfunction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200))
    knowledge = db.relationship('Knowledge', backref='malfunction', uselist=False)

    def serialize(self):
        return {
            "id": self.id,
            "description": self.description
        }

class Solution(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200))
    knowledge = db.relationship('Knowledge', backref='solution', uselist=False)

    def serialize(self):
        return {
            "id": self.id,
            "description": self.description
        }
    
class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(80))
    knowledge = db.relationship('Knowledge', backref='category', uselist=False)

    def serialize(self):
        return {
            "id": self.id,
            "description": self.description
        }

class Vehicle(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    license_plate = db.Column(db.String(20))
    available = db.Column(db.Boolean, default=True, nullable=False)
    model = db.Column(db.String(50), nullable=True)
    maker = db.Column(db.String(50), nullable=True)
    vehicle_photo = db.Column(db.String(50), nullable=True)
    tickets = db.relationship('Ticket', backref='vehicle', uselist=False)

    def serialize(self):
        return {
            "id":self.id,
            "license_plate": self.license_plate,
            "model" : self.model,
            "maker" : self.maker,
            "vehicle_photo" : self.vehicle_photo
        }

class EmployeeTicketObservation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    employee_id = db.Column(db.Integer, db.ForeignKey('employee.id'), nullable=False)
    ticket_id = db.Column(db.Integer, db.ForeignKey('ticket.id'), nullable=False)
    observation = db.Column(db.String(1024), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "employee_id": self.employee_id,
            "ticket_id": self.ticket_id,
            "observation": self.observation
        }   