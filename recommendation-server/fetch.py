import requests
import json
import os
from dotenv import load_dotenv
load_dotenv()
TMDB_API_KEY = os.getenv('TMDB_API_KEY')

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
