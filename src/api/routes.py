"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Customer, Employee, Ticket, Machine, Malfunction, Knowledge, Machine,TicketEmployeeRelation
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

    print(email, password)

    user = User.query.filter_by(email=email, password=password).first()

    if user:
        access_token = create_access_token(identity=user.email, expires_delta=datetime.timedelta(hours=1))
    else:
        return jsonify({"msg": "Bad username or password"}), 401

    return jsonify({'access_token': access_token, 'user_type': user.user_type_id}), 200


@api.route('/customer/create/ticket', methods=['POST'])
@jwt_required()
def create_ticket():
    try:
        current_user_email = get_jwt_identity()
        user = User.query.filter_by(email=current_user_email).one_or_none()

        if not user:
            return jsonify({"error": "Customer not found!"}), 401

        data = request.json

        print("############################")
        print(data)
        print("############################")

        machine_id = data["machine_id"]
        intervention_type = data["intervention_type"]
        subject = data['subject']
        description = data["description"]

        ticket = Ticket()
        ticket.customer_id = user.customer_id
        ticket.machine_id = machine_id
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

@api.route('/machinelist', methods=['GET'])
@jwt_required()
def get_machines():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).one_or_none()

    if not user:
        return jsonify({"msg": "Unauthorized access!"}), 401

    machines = Machine.query.filter_by(customer_id=user.customer_id).all()

    if not machines:
        return jsonify({"error": "No machines for that customer!"}), 400

    response_body = {
        "machines": [machine.serialize() for machine in machines]
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
        return jsonify({"error": "No tickets for this customer!"}), 400

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
        return jsonify({"error": "User profile not found"}), 401

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

@api.route('/admin/tickets', methods=['POST'])
@jwt_required()  
def assign_ticket():
    print('#$#$#$#$#$')
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).one_or_none()
    if not user:
        return jsonify({'message': 'User not found'}), 404
    if user.user_type.type != 'admin':
        return jsonify({'message': 'Access denied'}), 402
    data = request.get_json()
    ticket_id = data.get('ticket_id')
    technician_ids = data.get('technician_ids')
    if not ticket_id or not technician_ids:
        return jsonify({'message': 'Ticket ID or technician IDs is wrong or doesnt exist'}), 400
    ticket = Ticket.query.get(ticket_id)
    technicians = Employee.query.filter(Employee.id.in_(technician_ids)).all()
    if not ticket:
        return jsonify({'message': 'Ticket not found'}), 404
    if not technicians:
        return jsonify({'message': 'Technicians not found'}), 404
    for technician in technicians:
        ticket_employee_relation = TicketEmployeeRelation(
            ticket_id=ticket.id,
            employee_id=technician.id
        )
        db.session.add(ticket_employee_relation)
    db.session.commit()
    return jsonify({'message': 'Ticket assigned successfully'}), 200