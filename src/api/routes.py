"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Customer, Employee, Ticket, Equipment, Malfunction, Knowledge, TicketEmployeeRelation, Vehicle
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
import datetime


api = Blueprint('api', __name__)

@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    user = User.query.filter_by(email=email, password=password).first()

    if not user:
        return jsonify({"msg": "Bad username or password"}), 401
        
    access_token = create_access_token(identity=user.email, expires_delta=datetime.timedelta(hours=1))

    return jsonify({'access_token': access_token, 'user_type': user.user_type.type}), 200


@api.route('/customer/create/ticket', methods=['POST'])
@jwt_required()
def create_ticket():
    try:
        current_user_email = get_jwt_identity()
        user = User.query.filter_by(email=current_user_email).one_or_none()

        if not user:
            return jsonify({"msg": "Customer not found!"}), 401

        data = request.json

        print("############################")
        print(data)
        print("############################")

        equipment_id = data["equipment_id"]
        intervention_type = data["intervention_type"]
        subject = data['subject']
        description = data["description"]

        ticket = Ticket()
        ticket.customer_id = user.customer_id
        ticket.equipment_id = equipment_id
        ticket.intervention_type = intervention_type
        ticket.subject = subject
        ticket.description = description
        ticket.status = "Opened"
        ticket.open_ticket_time = datetime.datetime.now()
        db.session.add(ticket)
        # db.session.flush()

        # malfunction = Malfunction()
        # malfunction.description = description
        # db.session.add(malfunction)
        # db.session.flush()

        # knowledge = Knowledge()
        # knowledge.ticket_id = ticket.id
        # knowledge.malfunction_id = malfunction.id
        # db.session.add(knowledge)
        # db.session.flush()
        db.session.commit()

        return jsonify({"msg": "Ticket created successfully"}), 201
    except Exception as e:
        print(e.args)
        return jsonify({"msg": "Exception"}), 400

# @api.route('/equipmentlist', methods=['GET'])
@api.route('/customer/equipment', methods=['GET'])
@jwt_required()
def get_customer_equipments():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).one_or_none()

    if not user:
        return jsonify({"msg": "Unauthorized access!"}), 401

    equipments = Equipment.query.filter_by(customer_id=user.customer_id).all()

    if not equipments:
        return jsonify({"msg": "No equipments for that customer!"}), 400

    response_body = {
        "equipments": [equipment.serialize() for equipment in equipments]
    }
    return jsonify(response_body), 200

@api.route('/ticketlist', methods=['GET'])
@jwt_required()
def get_tickets():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).one_or_none()

    if not user:
        return jsonify({"msg": "Unauthorized access!"}), 401

    tickets = Ticket.query.filter_by(customer_id=user.customer_id).all()

    if not tickets:
        return jsonify({"msg": "No tickets for this customer!"}), 400

    response_body = {
        "tickets": [ticket.serialize() for ticket in tickets]
    }
    return jsonify(response_body), 200


@api.route('/user/profile', methods=['GET'])
@jwt_required()
def get_user_profile():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).one_or_none()

    if not user:
        return jsonify({"msg": "Unauthorized access!"}), 401
    
    user_profile =  {}
    user_profile['user_info'] = user.serialize()
    if user.customer_id:
        user_profile['customer_info'] = Customer.query.get(user.customer_id).serialize()
    elif user.employee_id:
        user_profile['employee_info'] = Employee.query.get(user.employee_id).serialize()


    response_body = {"user_profile": user_profile}
    return jsonify(response_body), 200

@api.route('/user/profile/update', methods=['PUT'])
@jwt_required()
def updateProfile():
    data = request.json
    
    # Fetch the customer based on the provided ID
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).one_or_none()

    if not user:
        return jsonify({"msg": "User profile not found"}), 401

    try:
        if 'user_info' in data:
            for k, v in data['user_info'].items():
                setattr(user, k, v)

        if 'customer_info' in data:
            for k, v in data['customer_info'].items():
                setattr(user.customer, k, v)

        if 'employee_info' in data:
            for k, v in data['employee_info'].items:
                setattr(user.employee, k, v)

        db.session.commit()

        return jsonify({"msg": "Profile updated successfully"}), 200
    
    except Exception as e:
        return jsonify({"msg": "Something went wrong when updating profile"}), 400


@api.route('/admin/ticketlist', methods=['GET'])
@jwt_required()
def get_tickets_not_closed():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).one_or_none()

    if not user:
        return jsonify({"msg": "No user exist with that email"}), 401

    if user.user_type.type != "admin":
        return jsonify({"msg": "Only admins can access this."}), 401

    tickets = Ticket.query.filter(Ticket.status.in_(['Opened', 'In Progress', 'Resolved'])).all()

    if not tickets:
        return jsonify({"msg": "No tickets to manage"}), 400

    response_body = {
        "tickets": [ticket.serialize() for ticket in tickets]
    }
    return jsonify(response_body), 200

@api.route('/assign/employee/ticket', methods=['POST'])
@jwt_required()  
def assign_ticket():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).one_or_none()

    if not user or user.user_type.type != 'admin':
        return jsonify({'msg': 'Only admins can create equipment profiles'}), 402
    
    data = request.get_json()

    ticket_id = data.get('ticket_id')
    employee_ids = data.get('employee_ids')
    
    if not ticket_id or not employee_ids:
        return jsonify({"msg": "Ticket ID or Employee(s) ID is wrong or doesn't exist"}), 401
    
    ticket = Ticket.query.get(ticket_id)
    employees = Employee.query.filter(Employee.id.in_(employee_ids)).all()

    if not ticket:
        return jsonify({'msg': 'Ticket not found'}), 401
    if not employees:
        return jsonify({'msg': 'Employee(s) not found'}), 401
    
    for employee in employees:
        ticket_employee_relation = TicketEmployeeRelation(
            ticket_id=ticket.id,
            employee_id=employee.id
        )
    
    db.session.add(ticket_employee_relation)
    db.session.commit()
    return jsonify({'msg': 'Employee(s) assigned successfully to ticket'}), 200

@api.route('/admin/equipment', methods=['POST'])
@jwt_required()  
def create_equipment():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).one_or_none()
    
    if not user or user.user_type.type != 'admin':
        return jsonify({'msg': 'Only admins can create equipment profiles'}), 402

    data = request.json
    if not data:
        return jsonify({'msg': 'No data provided'}), 400

    equipment = Equipment()
    equipment.serial_number = data.get('serial_number')
    equipment.model = data.get('model')
    equipment.im109 = data.get('im109')
    
    db.session.add(equipment)
    db.session.commit()

    return jsonify({'msg': 'Equipment created'}), 201

  
@api.route('/admin/equipment/<int:customer_id>', methods=['GET'])
@jwt_required()
def get_equipment_by_customer_id(customer_id):
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).one_or_none()
    
    if not user or user.user_type.type != 'admin':
        return jsonify({'msg': 'Only admins can access this endpoint'}), 400
    
    customer = Customer.query.get(customer_id)

    
    if not customer:
        return jsonify({'msg': 'customer_id parameter is missing'}), 400
    
    equipments = Equipment.query.filter_by(customer_id=customer_id).all()
    print("#################")
    print(customer_id)
    print(equipments)
    print("#################")

    return jsonify({"equipments": [equipment.serialize() for equipment in equipments]}), 200

@api.route('/employees/available', methods=['GET'])
@jwt_required()
def get_available_employees():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).one_or_none()
    
    if not user or user.user_type.type != 'admin':
        return jsonify({'msg': 'Only admins can access this endpoint'}), 401
    
    available_employees = Employee.query.filter_by(available=True).all()
    serialized_employees = [e.serialize() for e in available_employees]

    return jsonify(serialized_employees), 200

@api.route('/admin/equipments', methods=['GET'])
@jwt_required()
def get_all_equipments():
    # IF OTHERS EMPLOYEE'S NEED TO GET ALL EQUIPMENTS REMOVE FROM THIS LINE TO NEXT COMMENTED LINE
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).one_or_none()
    
    if not user or user.user_type.type != 'admin':
        return jsonify({'msg': 'Only admins can access this endpoint'}), 401
    # #####################################
    
    equipments = Equipment.query.all()
    serialized_equipments = [e.serialize() for e in equipments]

    return jsonify(serialized_equipments), 200


@api.route('/vehicles', methods=['GET'])
@jwt_required()
def get_all_vehicles():
    # IF OTHERS EMPLOYEE'S NEED TO GET ALL EQUIPMENTS REMOVE FROM THIS LINE TO NEXT COMMENTED LINE
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).one_or_none()
    
    if not user or user.user_type.type != 'admin':
        return jsonify({'msg': 'Only admins can access this endpoint'}), 401
    # #####################################

    vehicles = Vehicle.query.all()
    serialized_vehicles = [v.serialize() for v in vehicles]

    return jsonify(serialized_vehicles), 200

@api.route('/admin/vehicles/available', methods=['GET'])
@jwt_required()
def get_available_vehicles():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).one_or_none()
    if not user or user.user_type.type != 'admin':
        return jsonify({'msg': 'Only admins can access this endpoint'}), 401
    available_vehicles = Vehicle.query.filter_by(available=True).all()
    serialized_vehicle = [e.serialize() for e in available_vehicles]

    return jsonify(serialized_vehicle), 200
    




