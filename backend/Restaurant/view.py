from datetime import datetime
from flask_restx import Namespace,Resource,fields
from Auth.models import User
from .models import Recipe, Reservations
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask import jsonify, request
from random import randint

restaurant_ns=Namespace('restaurant', description="A namespace for restaurant")


recipe_model = restaurant_ns.model(
    "Recipe",
    {
        "id": fields.Integer(),
        "title": fields.String(),
        "description": fields.String()
    }
)

reservation_model = restaurant_ns.model(
    "Reservation",
    {
        "id": fields.Integer(),
        "num_of_people": fields.Integer(),
        "table_num": fields.Integer(),
        "time": fields.String(),
    }
)



@restaurant_ns.route('/hello')
class HelloResource(Resource):
    @jwt_required()
    def get(self):
        return {"message":"Hello World"}



@restaurant_ns.route('/recipes')
class RecipesResource(Resource):
    @jwt_required()
    @restaurant_ns.marshal_list_with(recipe_model)
    def get(self):
        """Get all recipes """
        recipes=Recipe.query.all()
        return recipes



@restaurant_ns.route('/reservations')
class ReservationResource(Resource):
    @jwt_required()
    @restaurant_ns.marshal_list_with(reservation_model)
    def get(self):
        """Get all my reservation """
        current_user= User.query.filter_by(username=get_jwt_identity()).first()
        print(current_user)
        reservations = Reservations.query.filter_by(user_id = current_user.id).all()
        
        return reservations


    @restaurant_ns.marshal_with(reservation_model)
    @restaurant_ns.expect(reservation_model)
    @jwt_required()
    def post(self):
        current_user= User.query.filter_by(username=get_jwt_identity()).first()
        data=request.get_json()

        new =Reservations(
            num_of_people=data.get('num_of_people'),
            time=datetime.strptime(data.get('time'), "%Y-%m-%d %H:%M"),
            table_num = randint(1,20),
            user = current_user
        )

        new.save()

        return new,201




@restaurant_ns.route('/reservations/<int:id>')
class ReservationResource(Resource):
    @jwt_required()
    @restaurant_ns.marshal_list_with(reservation_model)
    def delete(self, id):
        """Delete reservation by id """
        reservation = Reservations.query.get_or_404(id)
        reservation.delete()
        return jsonify({"message":"reservation has been deleted!"})

   
