from flask import Flask, request, jsonify
from flask_cors import CORS
import nltk
from nltk.stem import PorterStemmer
import os

from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize

path = os.path.join(os.getcwd(), 'nltk_data')
nltk.data.path.append(path)

required = ['punkt_tab', 'stopwords', 'wordnet', 'words'] 
for res in required:
    nltk.download(res, download_dir=path)

app = Flask(__name__)
CORS(app)


word = "This is a test sentence to check the stop words removal process."
output = word_tokenize(word)
stop_words = set(stopwords.words('polish'))
words = set(nltk.corpus.words.words())

print("Original sentence:", word)
print("Tokenized sentence:", output)
print("Stop words:", stop_words)
print("All words:", words)

@app.route("/")
def home():
    return "Testing site"