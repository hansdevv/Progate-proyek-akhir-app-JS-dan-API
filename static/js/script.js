document.addEventListener('DOMContentLoaded', function() {
	const formParams = document.querySelector('#formParams');
	const movieList = document.querySelector('#movie-list');

	function addOption(selectElement, optionValue, optionText) {
		const option = document.createElement('option');
		option.value = optionValue;
		option.text = optionText;
		selectElement.appendChild(option);
	};

	async function loadGenre() {
		const response = await fetch('/loadGenre');
		const data = await response.json();
		return data;
	};
	
	loadGenre().then(data => {
		const selectGenre = document.querySelector('#selectGenre');
		opt = '';
		data = data.results;
		for(let i=0; i<data.length; i++){
			let val = data[i];
			if(val == null){
				addOption(selectGenre,'','');
			}else{
				addOption(selectGenre, val, val);
			};
		};
	}).catch(error => {
		console.error(error);
	});
	
	async function loadTypeMovie() {
		const response = await fetch('/loadTypeMovie');
		const data = await response.json();
		return data;
	};
	
	loadTypeMovie().then(data => {
		const typeMovie = document.querySelector('#typeMovie');
		opt = '';
		data = data.results;
		for(let i=0; i<data.length; i++){
			let val = data[i];
			if(val == null){
				addOption(typeMovie,'','');
			}else{
				addOption(typeMovie, val, val);
			};
		};
	}).catch(error => {
		console.error(error);
	});

	formParams.addEventListener('submit', async function(event) {
		event.preventDefault();

		const genre = document.querySelector('#selectGenre').value;
		const typeMovie = document.querySelector('#typeMovie').value;
		const limitFilm = document.querySelector('#limitFilm').value;
		const year = document.querySelector('#year').value;

		const data = new URLSearchParams();
		data.append('genre', genre);
		data.append('type', typeMovie);
		data.append('limit', limitFilm);
		data.append('tahun', year);

		try {
			const response = await fetch('/movies', {
				method: 'POST',
				body: data
			});
			const res = await response.json();
			const movies = res.results;
			movies.forEach((movie) => {
				idFilm = movie.id;
				dayRilis = movie.releaseDate.day;
				monthRilis = movie.releaseDate.month;
				yearRilis = movie.releaseDate.year;
				judulFilm = movie.titleText.text;
				typeFilm = movie.titleType.text;
				imgUrl = movie.primaryImage.url
				template = `
				<div class="col-3">
					<div class="card">
						<img src="${imgUrl}" class="card-img-top" alt="" width="200" height="400">
						<div class="card-body">
							<h5 class="card-title">${judulFilm}</h5>
							<p class="card-text">
								Tanggal Rilis : ${dayRilis}-${monthRilis}-${yearRilis}
							</p><br>
							<a id="${idFilm}" href="#" class="btn btn-primary">Detail Film</a>
						</div>
					</div>
				</div>
				`;
				movieList.insertAdjacentHTML('beforeend',template);
			});

		} catch (error) {
			console.log(error);
		}
	});
});