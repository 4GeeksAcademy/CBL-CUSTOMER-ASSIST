"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Customer, Employee
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['GET'])
@jwt_required()
def get_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200

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

