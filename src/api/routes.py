"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Customer, Employee, Ticket, Machine
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
#works


@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)

    print(email, password)

    customer = Customer.query.filter_by(email=email, password=password).first()
    employee = Employee.query.filter_by(
        email=email, password=password).first()
    if customer:
        access_token = create_access_token(identity=customer.email)
    elif employee:
        access_token = create_access_token(identity=employee.email)
    else:
        return jsonify({"msg": "Bad username or password"}), 401

    return jsonify(access_token=access_token), 200

@api.route('/customer/tickets', methods=['POST', 'GET'])
# @jwt_required()
def create_ticket():
    if request.method == 'POST':
        # customer_email = get_jwt_identity()
        # We love nuno twice
        customer_id = 3
        machine_id = 3

        customer = Customer.query.filter_by(id=customer_id).first()
        if not customer:
            return jsonify({"msg": "Customer does not exist"}), 404

        machine = Machine.query.filter_by(id=machine_id).first()
        if not machine:
            return jsonify({"msg": "Machine does not exist"}), 404

        ticket = Ticket()
        ticket.customer_id = customer.id
        ticket.machine_id = machine.id
        ticket.status_id = 1
        ticket.intervention_type_id = request.json.get("intervention_type_id")
        ticket.open_ticket_time = datetime.datetime.now()

        db.session.add(ticket)
        db.session.commit()

        return jsonify({"msg": "Ticket created successfully"}), 201

    elif request.method == 'GET':
        # customer_email = get_jwt_identity()
        # Assuming you want to retrieve tickets for customer with ID 3
        customer_id = 3

        tickets = Ticket.query.filter_by(customer_id=customer_id).all()
        ticket_list = []
        for ticket in tickets:
            ticket_data = {
                "ticket_id": ticket.id,
                "customer_id": ticket.customer_id,
                "machine_id": ticket.machine_id,
                "status_id": ticket.status_id,
                "intervention_type_id": ticket.intervention_type_id,
                "open_ticket_time": ticket.open_ticket_time.strftime("%Y-%m-%d %H:%M:%S"),
                # Add more ticket details as needed
            }
            ticket_list.append(ticket_data)

        return jsonify(ticket_list), 200

#It's working
#qwe
@api.route('/customer/tickets', methods=['POST', 'GET'])
# @jwt_required()
def create_ticket():
    if request.method == 'POST':
        # customer_email = get_jwt_identity()
        # We love nuno twice
        customer_id = 3
        machine_id = 3


        customer = Customer.query.filter_by(id=customer_id).first()
        if not customer:
            return jsonify({"msg": "Customer does not exist"}), 404


        machine = Machine.query.filter_by(id=machine_id).first()
        if not machine:
            return jsonify({"msg": "Machine does not exist"}), 404

        ticket = Ticket()
        ticket.customer_id = customer.id
        ticket.machine_id = machine.id
        ticket.status_id = 1
        ticket.intervention_type_id = request.json.get("intervention_type_id")
        ticket.open_ticket_time = datetime.datetime.now()

        db.session.add(ticket)
        db.session.commit()

        return jsonify({"msg": "Ticket created successfully"}), 201

    elif request.method == 'GET':
        # customer_email = get_jwt_identity()
        # Assuming you want to retrieve tickets for customer with ID 3
        customer_id = 3

        tickets = Ticket.query.filter_by(customer_id=customer_id).all()
        ticket_list = []
        for ticket in tickets:
            ticket_data = {
                "ticket_id": ticket.id,
                "customer_id": ticket.customer_id,
                "machine_id": ticket.machine_id,
                "status_id": ticket.status_id,
                "intervention_type_id": ticket.intervention_type_id,
                "open_ticket_time": ticket.open_ticket_time.strftime("%Y-%m-%d %H:%M:%S"),
                # Add more ticket details as needed
            }
            ticket_list.append(ticket_data)

        return jsonify(ticket_list), 200


