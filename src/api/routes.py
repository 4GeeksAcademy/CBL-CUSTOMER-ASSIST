"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Customer, Employee, Ticket, Machine, Malfunction, Occurrence, InterventionType, Machine
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
        access_token = create_access_token(
            identity=user.email, expires_delta=datetime.timedelta(hours=1))
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

        machine_id = request.json.get("machine_id", None)
        intervention_id = request.json.get("intervention_id", None)
        description = request.json.get("description", None)

        ticket = Ticket()
        ticket.customer_id = user.customer_id
        ticket.machine_id = machine_id
        ticket.status_id = 1
        ticket.intervention_type_id = intervention_id
        ticket.open_ticket_time = datetime.datetime.now()
        db.session.add(ticket)
        db.session.flush()

        malfunction = Malfunction()
        malfunction.description = description
        db.session.add(malfunction)
        db.session.flush()

        occurrence = Occurrence()
        occurrence.ticket_id = ticket.id
        occurrence.malfunction_id = malfunction.id
        db.session.add(occurrence)
        db.session.flush()
        db.session.commit()

        return jsonify({"msg": "Ticket created successfully"}), 201
    except Exception as e:
        print(e.args)
        return jsonify({"msg": "Exception"}), 400


@api.route('/interventiontype', methods=['GET'])
@jwt_required()
def get_intervention_types():
    intervention_types = InterventionType.query.all()

    if not intervention_types:
        return jsonify({"msg": "No types found for intervention type!"}), 400

    response_body = {
        "intervention_type": [intervention_type.serialize() for intervention_type in intervention_types]
    }
    return jsonify(response_body), 200


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

    if user.customer_id:
        user_profile = Customer.query.get(user.customer_id).serialize()
    elif user.employee_id:
        user_profile = Employee.query.get(user.employee_id).serialize()

    response_body = {"user_profile": user_profile}
    return jsonify(response_body), 200


@api.route('/user/profile/update', methods=['PUT'])
@jwt_required()
def updateProfile():
    data = request.json
    print("############################")
    print(data)
    print("############################")

    # Fetch the customer based on the provided ID
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).one_or_none()

    if not user:
        return jsonify({"error": "User profile not found"}), 401

    try:
        if 'user_info' in data:
            # db.session.execute(db.update(User).filter_by(id=user.id).values(**data['user_info'])) # DO THE SAME IN ONE LINE AS THE NEXT 3 LINES BELOW
            user = User.query.get(user.id)
            for k in data['user_info']:
                setattr(user, k, data['user_info'][k])
        if 'customer_info' in data:
            customer = Customer.query.get(user.customer_id)
            for k in data['customer_info']:
                setattr(customer, k, data['customer_info'][k])
        if 'employee_info' in data:
            employee = Employee.query.get(user.employee_id)
            for k in data['employee_info']:
                setattr(employee, k, data['employee_info'][k])

        db.session.commit()

        return jsonify({"msg": "Profile updated successfully"}), 200

    except Exception as e:
        print(e)
        return jsonify({"msg": "Something went wrong when updating profile"}), 400
