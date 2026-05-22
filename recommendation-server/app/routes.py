from flask import Blueprint, jsonify, request
from flask_cors import CORS
from app.preprocess import get_recommendation

main_bp = Blueprint('main', __name__)
CORS(main_bp)

@main_bp.route("/")
def home():
    movie_id = 500

    try:
        reccomendation = get_recommendation(movie_id)
        return jsonify(reccomendation)
    except Exception as ex:
        return jsonify({"error": str(ex)}), 500