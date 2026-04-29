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


stemmer = PorterStemmer()

def preprocess_text():
    checked_movie = fetch_movie(550)
    recommended_movies =fetch_data(550)

    movie_ids = []
    movie_ids.append(checked_movie['id'])


    checked_movie['overview'] = word_tokenize(checked_movie['overview'])
    filtered_movie = [
        stemmer.stem(word.lower()) for word in checked_movie['overview'] if word.lower() not in stopwords and word.isalpha()
    ]
    checked_movie['overview'] = filtered_movie

    for item in recommended_movies:
        movie_ids.append(item['id'])
        item['overview'] = word_tokenize(item['overview'])

        filtered_overview = [
            stemmer.stem(word.lower()) for word in item['overview'] if word.lower() not in stopwords and word.isalpha()
        ]

        item['overview'] = filtered_overview
    

    preprecessed_data = []
    stringified_checkMovie = ' '.join(checked_movie['overview'])
    preprecessed_data.append(stringified_checkMovie)
    for movie in recommended_movies:
        preprecessed_data.append(' '.join(movie['overview']))


    return preprecessed_data, movie_ids



# X = [0,0,0]
# Y = [1,1,1]

# A = [1,1,1]
# B = [1,1,1]
# res = cosine_similarity([X], [Y])
# res2 = cosine_similarity([A], [B])
#print("Cosine similarity:", res, "Cosine similarity A-B:", res2)

stopwords = set(stopwords.words('english'))


@app.route("/")
def home():
    data, movie_ids = preprocess_text()
    vectorizer = TfidfVectorizer()
    matrix = vectorizer.fit_transform(data)
    cosine_sim = cosine_similarity(matrix[0:1], matrix)
    #return matrix.toarray().tolist()
    hashmap = {}
    for i in range(0, len(data)):
        hashmap[movie_ids[i]] = cosine_sim[0][i]
    
    # m1 = fetch_movie(550)
    # m2 = fetch_movie(1213)
    # return jsonify({
    # "movie_1": m1,
    # "movie_2": m2
    # })
    return jsonify(hashmap)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)