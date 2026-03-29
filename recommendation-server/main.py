from flask import Flask, request, jsonify
from flask_cors import CORS
import nltk
import os

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

path = os.path.join(os.getcwd(), 'nltk_data')
nltk.data.path.append(path)

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Testing site"