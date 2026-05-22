import requests
import json
import os
from dotenv import load_dotenv
load_dotenv()
TMDB_API_KEY = os.getenv('TMDB_API_KEY')

def fetch_movie(movie_id):
    url = f"https://api.themoviedb.org/3/movie/{movie_id}?api_key={TMDB_API_KEY}&language=en-US"
    
    response = requests.get(url)
    
    if response.status_code == 200:
        data = response.json()
        return {"id": data['id'], "title": data['title'], "overview": data['overview']}
    else:
        print(f"Error: {response.status_code}")
        return None



def fetch_data(movie_id):
    pages = 5
    all_results = []

    for page in range(1, pages + 1):
        url = f"https://api.themoviedb.org/3/movie/{movie_id}/recommendations?api_key={TMDB_API_KEY}&language=en-US&page={page}"
        response = requests.get(url)
        
        if response.status_code == 200:
            data = response.json()
            results = data.get('results', [])
            
            if not results:
                break
                
            for movie in results:
                all_results.append({
                    "id": movie['id'], 
                    "title": movie['title'], 
                    "overview": movie['overview']
                })
            
            if page >= data.get('total_pages', 0):
                break
        else:
            print(f"Error on page {page}: {response.status_code}")
            break
            
    return all_results