from flask import Flask, render_template, jsonify, request
import requests
import os
from dotenv import load_dotenv

load_dotenv()

req = requests.request

app = Flask(__name__)
API_KEY = os.getenv('API-KEY')

headers = {
	"X-RapidAPI-Key": API_KEY,
	"X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com"
}

@app.route('/')
def index():
  return render_template('index.html')

@app.route('/loadGenre')
def load_genre():
	genre = req('GET', "https://moviesdatabase.p.rapidapi.com/titles/utils/genres", headers=headers)
	data = genre.json()
	return data

@app.route('/loadTypeMovie')
def load_type_movie():
	typeMovie = req('GET', "https://moviesdatabase.p.rapidapi.com/titles/utils/titleTypes", headers=headers)
	data = typeMovie.json()
	return data

@app.route('/movies', methods=['POST'])
def movies():
	if(request.method == 'POST'):
		genre = request.form['genre']
		typeMovie = request.form['type']
		limit = request.form['limit']
		year = request.form['tahun']

		querystring = {"titleType":typeMovie,"genre":genre,"limit":limit,"year":year}

		url = "https://moviesdatabase.p.rapidapi.com/titles"

		headers = {
			"X-RapidAPI-Key": API_KEY,
			"X-RapidAPI-Host": "moviesdatabase.p.rapidapi.com"
		}

		response = requests.request("GET", url, headers=headers, params=querystring)

		data = response.json()
		return jsonify(data)

if __name__ == '__main__':
	app.run(debug=True)
