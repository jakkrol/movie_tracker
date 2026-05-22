# stopwords = set(stopwords.words('english'))

# def preprocess_text(checked_movie, recommended_movies):

#     checked_movie['overview'] = word_tokenize(checked_movie['overview'])
#     filtered_movie = [
#         word.lower() for word in checked_movie['overview'] if word.lower() not in stopwords and word.isalpha()
#     ]
#     checked_movie['overview'] = filtered_movie

#     for item in recommended_movies:
#         item['overview'] = word_tokenize(item['overview'])

#         filtered_overview = [
#             word.lower() for word in item['overview'] if word.lower() not in stopwords and word.isalpha() 
#         ]

#         item['overview'] = filtered_overview

#     return checked_movie, recommended_movies


import os
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

from app.fetch import fetch_data, fetch_movie


path = os.path.join(os.getcwd(), 'nltk_data')
nltk.data.path.append(path)

if not os.path.exists(path):
    os.makedirs(path)
    required = ['punkt_tab', 'stopwords', 'wordnet', 'words'] 
    for res in required:
        nltk.download(res, download_dir=path)


stemmer = PorterStemmer()
stopwords = set(stopwords.words('english'))

def get_recommendation(movie_id):
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



    vectorizer = TfidfVectorizer()
    matrix = vectorizer.fit_transform(preprecessed_data)
    cosine_sim = cosine_similarity(matrix[0:1], matrix)
    #return matrix.toarray().tolist()
    hashmap = {}
    for i in range(0, len(preprecessed_data)):
        hashmap[movie_ids[i]] = cosine_sim[0][i]
    
    # m1 = fetch_movie(550)
    # m2 = fetch_movie(1213)
    # return jsonify({
    # "movie_1": m1,
    # "movie_2": m2
    # })
    sorted_map = sorted(hashmap.items(), key=lambda x: x[1], reverse=True)
    return sorted_map
