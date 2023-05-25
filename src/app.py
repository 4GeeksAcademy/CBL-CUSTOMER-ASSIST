"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, StatusValue, InterventionType, Machine, Employee, Customer, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import JWTManager
import json

#from models import Person

ENV = os.getenv("FLASK_ENV")
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = "super-secret"  # Change this "super secret" with something else!
jwt = JWTManager(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# TABLE VALUES INITIALIZATION
# StatusValue table
def status_value_initialize():
    if len(StatusValue.query.all()) == 0:    
        with open ("src/table_initial_values/status_value_initialization.json") as file:
            data = json.load(file)
        statuses = [StatusValue(**item) for item in data]
        db.session.bulk_save_objects(statuses)
        db.session.commit()

# InterventionType table
def intervention_type_initialize():
    if len(InterventionType.query.all()) == 0:  
        with open ("src/table_initial_values/intervention_type_initialization.json") as file:
            data = json.load(file)
        types = [InterventionType(**item) for item in data]
        db.session.bulk_save_objects(types)
        db.session.commit()

# Machine table
def machine_initialize():
    if len(Machine.query.all()) == 0:  
        with open ("src/table_initial_values/machine_initialization.json") as file:
            data = json.load(file)
        machines = [Machine(**item) for item in data]
        db.session.bulk_save_objects(machines)
        db.session.commit()

# Employee table
def employee_initialize():
    if len(Employee.query.all()) == 0:  
        with open ("src/table_initial_values/employee_initialization.json") as file:
            data = json.load(file)
        employees = [Employee(**item) for item in data]
        db.session.bulk_save_objects(employees)
        db.session.commit()

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        # table values initialization
        status_value_initialize()
        intervention_type_initialize()
        machine_initialize()

        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
