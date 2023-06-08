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


# @api.route('/hello', methods=['GET'])
# @jwt_required()
# def get_hello():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend"
#     }

#     return jsonify(response_body), 200
# works


@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    print(email, password)

    user = User.query.filter_by(email=email, password=password).first()

    if user:
        access_token = create_access_token(identity=user.email)
    else:
        return jsonify({"msg": "Bad username or password"}), 401

    return jsonify({'access_token': access_token, 'user_type': user.user_type_id}), 200


@api.route('/customer/create/ticket', methods=['POST'])
@jwt_required()
def create_ticket():
    try:
        current_user_email = get_jwt_identity()
        user = User.query.filter_by(
            email=current_user_email).one_or_none()

        if not user:
            return jsonify({"error": "Customer not found!"}), 404

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
    except Exception:
        return jsonify({"msg": "Exception"}), 400

# It's working


@api.route('/user/profile/update', methods=['PUT'])
# @jwt_required()
def updateProfile():
    data = request.json

    # Fetch the customer based on the provided ID
    current_user_email = data['email']
    user_info = User.query.filter_by(
        email=current_user_email).one_or_none()

    if not user_info:
        return jsonify({"error": "User profile not found"}), 404
    try:
        if user_info.customer_id:
            db.session.execute(db.update(Customer).filter_by(
                id=user_info.customer_id).values(**data['info']))
        if user_info.employee_id:
            db.session.execute(db.update(Employee).filter_by(
                id=user_info.employee_id).values(**data['info']))

        db.session.commit()
        return jsonify({"msg": "Profile updated successfully"}), 200
    except Exception as e:
        print(e.args)
        return jsonify({"msg": "Something went wrong when updating profile"}), 404


@api.route('/interventiontype', methods=['GET'])
@jwt_required()
def get_intervention_types():
    intervention_types = InterventionType.query.all()

    if not intervention_types:
        return jsonify({"msg": "No types found for intervention type!"}), 404

    response_body = {
        "intervention_type": [intervention_type.serialize() for intervention_type in intervention_types]
    }
    return jsonify(response_body), 200


@api.route('/machinelist', methods=['GET'])
@jwt_required()
def get_machines():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(
        email=current_user_email).one_or_none()

    if not user:
        return jsonify({"msg": "Unauthorized access!"}), 401

    machines = Machine.query.filter_by(customer_id=user.customer_id).all()

    if not machines:
        return jsonify({"msg": "No machines where found for this customer!"}), 404

    response_body = {
        "machines": [machine.serialize() for machine in machines]
    }
    return jsonify(response_body), 200


@api.route('/ticketlist', methods=['GET'])
@jwt_required()
def get_tickets():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(
        email=current_user_email).one_or_none()

    if user:
        tickets = Ticket.query.filter_by(customer_id=user.customer_id).all()

    if not tickets:
        return jsonify({"error": "No machines for that customer!"}), 404

    response_body = {
        "machines": [ticket.serialize() for ticket in tickets]
    }
    return jsonify(response_body), 200


@api.route('/user/profile', methods=['GET'])
@jwt_required()
def get_user_profile():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(
        email=current_user_email).one_or_none()

    if user:
        if user.customer_id:
            user_info = Customer.query.get(user.customer_id)
            user_profile = user_info.serialize()
            # user_profile['user_type'] = user.user_type.type
        elif user.employee_id:
            user_info = Employee.query.get(user.employee_id)
            user_profile = user_info.serialize()
            # user_profile['user_type'] = user.user_type.type
        else:
            print("No user info found for user:", user.id)
            return jsonify({"msg": "No user information found"}), 404
        print("User profile found:", user_profile)
        return jsonify({"user_profile": user_profile}), 200
    else:
        print("User not found for email:", email)
        return jsonify({"msg": "User doesn't exist."}), 404
