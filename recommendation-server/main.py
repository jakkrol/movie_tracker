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





X = [0,0,0]
Y = [1,1,1]

A = [1,1,1]
B = [1,1,1]
res = cosine_similarity([X], [Y])
res2 = cosine_similarity([A], [B])



@app.route("/")
def home():
    fetch_data(550)
    print("Cosine similarity:", res, "Cosine similarity A-B:", res2)
    return "Testing site"



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)