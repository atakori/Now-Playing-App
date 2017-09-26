let notInterested = [];
const movieDB_search_URL = "https://api.themoviedb.org/3/discover/movie";
const movieDB_genre_URL =  "https://api.themoviedb.org/3/genre/movie/list";
const movieDB_poster_URL = "https://image.tmdb.org/t/p/w500"
const youtube_search_URL = "https://www.googleapis.com/youtube/v3/search";

//contains the movies that the user is not interested in 
//watching

let selectedGenre;
let queryGenreID;
let currentMovieTitle;
let movieDBGenres = [28,12,16,35,80,99,18,10751,14,36,27, 10402,9648,
					 10749,878,10770,53,10752,37]

//I have to make this global to be able to access it in 
//getGenreID();

function searchMovie () {
	$('.movie-search-form').on('click', '.search-button', function(event) {
		event.preventDefault();
		selectedGenre= $('.search-query').val();
		getGenreIDfromAPI(selectedGenre, changeGenreIntoGenreID);
		getDataFromMovieDBAPI(queryGenreID, displayMovieInformation);
		getDataFromYoutubeAPI(currentMovieTitle, showMovieTrailer);
	})
	//this is to be used with for the '.search-button'
	//will prevent the form from being submitted and
	//will get the user inputted genre

	//Movie DB sorts genres by assigning genre-id's 
	//I am going to have to make a function to make
	//the query change to the cooresponding genre id
}

function changeGenreIntoGenreID (data) {
	/*let movieGenre= data.genres.filter( obj => obj.name.toLowerCase() === selectedGenre.toLowerCase());*/
	let movieGenre= data.genres.find(obj => obj.name.toLowerCase() === selectedGenre.toLowerCase());
	queryGenreID = movieGenre.id;
	console.log(queryGenreID);
	/*console.log(queryGenreID);*/
	//needs to access genre /movie list and pull
	//the cooresponding genre id
	//return the id <<WORKS>>
}

function getGenreIDfromAPI (query, callback) {
	let dataRequest = {
		api_key: 'a916990541912af1edec4ebbf21fc10f',
		language: 'en-US'
	}

	$.getJSON(movieDB_genre_URL, dataRequest, callback);
}
function getDataFromMovieDBAPI(query, callback) {
	let dataRequest = {
		api_key: 'a916990541912af1edec4ebbf21fc10f',
		sort_by: 'popularity.desc',
		with_genres: query,
		page: 1
		//need to figure out which page should be selected
		//might need to further narrow search results via year
	}

	$.getJSON(movieDB_search_URL, dataRequest, callback)
	// this will get the value from searchMovie() to 
	//be used as a search term (query) in the MovieDBAPI results
	//shows movie information
	//calls displayMovieInformation()
	//calls showMovieTrailer()
}

function getDataFromYoutubeAPI(movieName, callback) {
	let dataRequest= {
		part: 'snippet',
		key: 'AIzaSyAyZ7hLX43U8Uun1KYxeXzqi9Pmj0qASvg',
		q: `${movieName} official trailer`,
		type: 'video',
		maxResults: 1,
	}

	$.getJSON(youtube_search_URL, dataRequest, callback);
	//calls the callback function by using .getJSON();
	//same as getDataFromMovieDBAPI, but to be applied to
	//the Youtube API
	// calls showMovieTrailer()
}

function displayMovieInformation (data) {
	let currentMovieData = data.results[0];
	currentMovieTitle = currentMovieData.title 
	console.log(currentMovieTitle);
	//this line will randomize most likely with the title
	//added to list of already suggesting movies
	// ---ADD FEATURE OF NO / YES/ MAYBE LIST ---

	$('.movie-header').html(`<h2 class= "movie-title"> ${currentMovieData.title} </h2>
		<img class= "movie-poster" src= ${movieDB_poster_URL}${currentMovieData.poster_path}>
		<p class= "movie-score-text"> Rating: <span class= "movie-score">
		${currentMovieData.vote_average} </span> </p>`);
	$('.movieDB-synopsis').html(`<p> ${currentMovieData.overview}</p>`);
	//takes the array from getDataFromMovieDBAPI(query)
	//randomizes which movie object information to 
	//to display all of the relevent information 
	//in '.movie-info
	//random.math up to # of results???
	//or just increases the array[i] number each time 
	//pickanothermovie() is run
}

function showMovieTrailer(youtubeData) {
	let firstResult = youtubeData.items[0];
	let officialTrailer = embedYoutubeVideo(firstResult);
	$('.youtube-movie-trailer').html(officialTrailer);
}

function embedYoutubeVideo(result) {
	return `<iframe width="560" height="315" 
	src="https://www.youtube.com/embed/${result.id.videoId}" 
	frameborder="0" allowfullscreen></iframe>`
}

function hideSearchResults() {
	//hides all movie sections if nothing has 
	//been search yet
}

function handleRandomMovieButton() {
	$('.movie-search-form').on('click', '.random-search-button', function (event) {
		event.preventDefault();
		let randomizedGenre = movieDBGenres[Math.floor(Math.random()*movieDBGenres.length)];
		queryGenreID = randomizedGenre;
		getDataFromMovieDBAPI(queryGenreID, displayMovieInformation);
		getDataFromYoutubeAPI(currentMovieTitle, showMovieTrailer);
	})
}

function pickanothermovie() {
	//add the movie to the notInterested array
	// prevent form submission for '.seen-it-button'
	//runs displaymovieInformation(), displayMovieTrailer(),
	//again
}

$(searchMovie());
$(handleRandomMovieButton());