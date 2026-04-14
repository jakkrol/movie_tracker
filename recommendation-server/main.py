from flask import Flask, request, jsonify
from flask_cors import CORS

import pandas as pd
import numpy as np

import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

import os
import requests

import json
from dotenv import load_dotenv
load_dotenv()
TMDB_API_KEY = os.getenv('TMDB_API_KEY')


path = os.path.join(os.getcwd(), 'nltk_data')
nltk.data.path.append(path)

required = ['punkt_tab', 'stopwords', 'wordnet', 'words'] 
for res in required:
    nltk.download(res, download_dir=path)

app = Flask(__name__)
CORS(app)


# word = "This is a test sentence to check the stop words removal process."
# output = word_tokenize(word)
# stop_words = set(stopwords.words('polish'))
# words = set(nltk.corpus.words.words())

# print("Original sentence:", word)
# print("Tokenized sentence:", output)
# print("Stop words:", stop_words)
# print("All words:", words)


def fetch_data(movie_id):
# Endpoint dla rekomendacji
    url = f"https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key={TMDB_API_KEY}&language=en-US"
    
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        results = data.get('results', [])
        if results:
            print("\n--- PRZYKŁADOWY OBIEKT FILMU Z API ---")

            print(json.dumps(results[0], indent=4, ensure_ascii=False))
            
            print("\n--- LISTA TYTUŁÓW I ICH OPISÓW ---")
            for i, movie in enumerate(results[:5], 1):
                print(f"{i}. {movie['title']} (ID: {movie['id']})")
                print(f"   Opis: {movie['overview'][:100]}...")
                print("-" * 20)
        else:
            print("Brak rekomendacji dla tego filmu.")
    else:
        print(f"Błąd API: {response.status_code}")



@app.route("/")
def home():
    fetch_data(550)
    return "Testing site"



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)