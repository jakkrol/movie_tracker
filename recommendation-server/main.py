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

from fetch import fetch_data
from fetch import fetch_movie


path = os.path.join(os.getcwd(), 'nltk_data')
nltk.data.path.append(path)

if not os.path.exists(path):
    os.makedirs(path)
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



def preprocess_text():
    checked_movie = fetch_movie(550)
    recommended_movies =fetch_data(550)
    print("Cosine similarity:", res, "Cosine similarity A-B:", res2)

    checked_movie['overview'] = word_tokenize(checked_movie['overview'])
    filtered_movie = [
        word.lower() for word in checked_movie['overview'] if word.lower() not in stopwords and word.isalpha()
    ]
    checked_movie['overview'] = filtered_movie

    for item in recommended_movies:
        item['overview'] = word_tokenize(item['overview'])

        filtered_overview = [
            word.lower() for word in item['overview'] if word.lower() not in stopwords and word.isalpha() 
        ]

        item['overview'] = filtered_overview

    return checked_movie, recommended_movies

X = [0,0,0]
Y = [1,1,1]

A = [1,1,1]
B = [1,1,1]
res = cosine_similarity([X], [Y])
res2 = cosine_similarity([A], [B])

stopwords = set(stopwords.words('english'))


@app.route("/")
def home():
    data = preprocess_text()
    checked_movie, recommended_movies = data
    return jsonify(recommended_movies)



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)