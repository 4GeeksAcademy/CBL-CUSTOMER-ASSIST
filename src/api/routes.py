"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Customer, Employee, Ticket
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
        company_email=email, password=password).first()
    if customer:
        access_token = create_access_token(identity=customer.email)
    elif employee:
        access_token = create_access_token(identity=employee.company_email)
    else:
        return jsonify({"msg": "Bad username or password"}), 401

    return jsonify(access_token=access_token), 200

@api.route('/tickets', methods=['POST'])
# @jwt_required()
def create_ticket():
    # customer_email = get_jwt_identity()
    email = "customer1@email.com"
    serial_number = "AA0101"
    customer = Customer.query.filter_by(email=email).first()

    if not customer:
        return jsonify({"msg": "Customer does not exist"}), 404

    ticket = Ticket()
    ticket.customer_id = customer.id
    ticket.machine_serial_number = serial_number
    ticket.status_id = request.json.get("status_id")
    ticket.intervention_type_id = request.json.get("intervention_type_id")
    ticket.vehicle_license_plate = request.json.get("vehicle_license_plate")
    ticket.km_on_leave = request.json.get("km_on_leave")
    ticket.open_ticket_time = datetime.datetime.now()
    db.session.add(ticket)
    db.session.commit()

    return jsonify({"msg": "Ticket created successfully"}), 201

#It's working
@api.route('/customer/updateprofile', methods=['PUT'])
# @jwt_required()
def updateProfile():
    body = request.json

    customer = Customer.query.filter_by(email=body["email"]).first()
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


