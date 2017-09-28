let notInterested = [];
const movieDB_search_URL = "https://api.themoviedb.org/3/discover/movie";
const movieDB_genre_URL =  "https://api.themoviedb.org/3/genre/movie/list";
const movieDB_poster_URL = "https://image.tmdb.org/t/p/w500"
let movieDB_reviews_URL = "https://api.themoviedb.org/3/movie/movieID/reviews"
const youtube_search_URL = "https://www.googleapis.com/youtube/v3/search";


//contains the movies that the user is not interested in 
//watching

let selectedGenre;
let queryGenreID;
let currentMovieTitle;
/*let movieID;*/
let movieIndex= 0;
let movieDBGenres = [28,12,16,35,80,99,18,10751,14,36,27, 10402,9648,
					 10749,878,10770,53,10752,37];
					 // this should be made directly from the API
					 //in case any are added in the future
					 // -- not likely but just in case

function searchMovie () {
	$('.movie-search-form').on('click', '.search-button', function(event) {
		event.preventDefault();
		selectedGenre= $('.search-query').val();
		getGenreIDfromAPI(selectedGenre, changeGenreIntoGenreID);
		/*getDataFromMovieDBAPI(queryGenreID, displayMovieInformation);*/
		/*getDataFromYoutubeAPI(currentMovieTitle, showMovieTrailer);*/
		/*getReviewsFromMovieDBAPI(currentMovieTitle, displayUserReviews);*/
		/*checkNotInterestedMovies();*/
		revealSearchResults();
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
	getDataFromMovieDBAPI(queryGenreID, displayMovieInformation);
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

function getReviewsFromMovieDBAPI(query, callback) {
	let dataRequest = {
		api_key:'a916990541912af1edec4ebbf21fc10f',
		page: 1
		//this is used to get the user movie reviews from Movie DB
	}

	$.getJSON(movieDB_reviews_URL, dataRequest, callback);
}

function displayUserReviews(movieDBReviewData) {
	let movieDBReviews = movieDBReviewData.results.map((item, index) => renderReviews(item));
	$('.critics-section').html(movieDBReviews);
	//this is used to display the user reviews from MovieDB
	// and/or filmcrave.com
}

function renderReviews(userReview) {
	return `<li class= user-review> ${userReview.content} 
	<div> Review by: ${userReview.author}</div></li>`
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
	let currentMovieData = data.results[movieIndex];
	currentMovieTitle = currentMovieData.title 
	movieID = currentMovieData.id;
	movieDB_reviews_URL = movieDB_reviews_URL.replace("movieID", movieID);
	getDataFromYoutubeAPI(currentMovieTitle, showMovieTrailer);
	getReviewsFromMovieDBAPI(currentMovieTitle, displayUserReviews);
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
	$('.movie-info').hide();
	//hides all movie sections if nothing has 
	//been search yet
}
function revealSearchResults() {
	$('.movie-info').show();
}

function handleRandomMovieButton() {
	$('.movie-search-form').on('click', '.random-search-button', function (event) {
		event.preventDefault();
		let randomizedGenre = movieDBGenres[Math.floor(Math.random()*movieDBGenres.length)];
		queryGenreID = randomizedGenre;
		getDataFromMovieDBAPI(queryGenreID, displayMovieInformation);
		/*checkNotInterestedMovies();*/
		revealSearchResults();
	})
}

function handleSeenItButton() {
	$('.movie-search-form').on('click', '.seen-it-button', function(event) {
		event.preventDefault();
		/*pickanothermovie();*/
		console.log('working');
});
}

/*function pickanothermovie() {
	getDataFromMovieDBAPI(queryGenreID, displayMovieInformation);
	getDataFromYoutubeAPI(currentMovieTitle, showMovieTrailer);
	checkNotInterestedMovies();
	};*/
	//add the movie to the notInterested array
	// prevent form submission for '.seen-it-button'
	//runs displaymovieInformation(), displayMovieTrailer(),
	//again

/*function checkNotInterestedMovies() {
	if (notInterested.find(movie => movie === currentMovieTitle)) {
			movieIndex += 1;
			pickanothermovie();
		} else {
			notInterested.push(currentMovieTitle);
		}
	};*/
		//checks the notInterested array to see if a user has
		//already seen the movie
		//addst the movie if they have not

$(searchMovie());
$(handleRandomMovieButton());
$(handleSeenItButton());
hideSearchResults();