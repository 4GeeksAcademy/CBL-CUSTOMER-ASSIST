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


@api.route('/login', methods=['POST'])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    print(email, password)

    customer = Customer.query.filter_by(email=email, password=password).first()
    employee = Employee.query.filter_by(
        email=email, password=password).first()
    if customer:
        print(customer)
        access_token = create_access_token(identity=customer.email)
    elif employee:
        access_token = create_access_token(identity=employee.email)
    else:
        return jsonify({"msg": "Bad username or password"}), 401

    return jsonify(access_token=access_token), 200


@api.route('/customer/create/ticket', methods=['POST'])
@jwt_required()
def create_ticket():
    try:
        current_customer_email = get_jwt_identity()
        customer = Customer.query.filter_by(
            email=current_customer_email).one_or_none()

        if not customer:
            return jsonify({"error": "Customer not found!"}), 404

        machine_id = request.json.get("machine_id", None)
        intervention_id = request.json.get("intervention_id", None)
        description = request.json.get("description", None)

        ticket = Ticket()
        ticket.customer_id = customer.id
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


@api.route('/customer/update/profile', methods=['PUT'])
# @jwt_required()
def updateProfile():
    body = request.json

    customer_id = 3  # Assuming the client provides the customer ID

    # Fetch the customer based on the provided ID
    customer = Customer.query.get(customer_id)
    if customer:
        # Update the fields based on the provided data
        if "new_email" in body:
            customer.email = body["new_email"]
        if "new_company_name" in body:
            customer.company_name = body["new_company_name"]
        if "new_password" in body:
            customer.password = body["new_password"]
        if "new_contact_phone" in body:
            customer.contact_phone = body["new_contact_phone"]
        if "new_contact_person" in body:
            customer.contact_person = body["new_contact_person"]

        db.session.commit()

        return jsonify({"message": "Profile updated successfully"})
    else:
        return jsonify({"error": "Customer not found"})


@api.route('/interventiontype', methods=['GET'])
@jwt_required()
def get_intervention_types():
    intervention_types = InterventionType.query.all()

    if not intervention_types:
        return jsonify({"error": "Something wrong with intervention types request!"}), 404

    response_body = {
        "intervention_type": [intervention_type.serialize() for intervention_type in intervention_types]
    }
    return jsonify(response_body), 200


@api.route('/machinelist', methods=['GET'])
@jwt_required()
def get_machines():
    current_customer_email = get_jwt_identity()
    customer = Customer.query.filter_by(
        email=current_customer_email).one_or_none()

    if customer:
        machines = Machine.query.filter_by(customer_id=customer.id).all()

    if not machines:
        return jsonify({"error": "No machines for that customer!"}), 404

    response_body = {
        "machines": [machine.serialize() for machine in machines]
    }
    return jsonify(response_body), 200


@api.route('/ticketlist', methods=['GET'])
@jwt_required()
def get_tickets():
    current_customer_email = get_jwt_identity()
    customer = Customer.query.filter_by(
        email=current_customer_email).one_or_none()

    if customer:
        print(customer.id)
        tickets = Ticket.query.filter_by(customer_id=customer.id).all()

    if not tickets:
        return jsonify({"error": "No machines for that customer!"}), 404

    response_body = {
        "machines": [ticket.serialize() for ticket in tickets]
    }
    return jsonify(response_body), 200
