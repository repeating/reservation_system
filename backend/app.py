from datetime import timedelta
from flask import Flask
from flask_restx import Api
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from Restaurant.view import restaurant_ns
from Auth.view import auth_ns
from database import db
from config import DevConfig
import sys
from seed import Seeder


def create_app(config):
    app=Flask(__name__)
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///dev.db"
    app.config["JWT_SECRET_KEY"] = "3813f0da23df5b5cc9e438603d47bbf2f99f65ff102ef029a516687c5e45adb1"
    app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=12)
    CORS(app)

    db.init_app(app)

    migrate = Migrate()
    migrate.init_app(app, db)
    JWTManager(app)

    if 'seed' in sys.argv:
        with app.app_context():
            Seeder().seed()

    api=Api(app,doc='/docs')

    api.add_namespace(restaurant_ns)
    api.add_namespace(auth_ns)

    return app


if __name__ == "__main__":
    app = create_app(DevConfig)
    app.run(host='0.0.0.0')