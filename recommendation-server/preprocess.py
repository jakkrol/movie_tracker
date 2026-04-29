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