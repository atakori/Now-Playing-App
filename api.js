let AlreadySuggested = [];
let userWatchList = [];

const movieDB_search_URL = "https://api.themoviedb.org/3/discover/movie";
let movieDB_movie_search_URL =`https://api.themoviedb.org/3/movie/`;
const movieDB_genre_URL =  "https://api.themoviedb.org/3/genre/movie/list";
const movieDB_poster_URL = "https://image.tmdb.org/t/p/w500";
let movieDB_reviews_URL = "https://api.themoviedb.org/3/movie/movieID/reviews";
const youtube_search_URL = "https://www.googleapis.com/youtube/v3/search";
const newYorkTimes_reviews_URL = "https://api.nytimes.com/svc/movies/v2/reviews/search.json";

//contains the movies that the user is not interested in 
//watching

let selectedGenre;
let queryGenreID;
let currentMovieTitle;
let currentMovieData; 
let projectorText;
let currentGenreBackground;
let movieID;
let movieIndex= 0;
let movieDBGenres = [28,12,16,35,80,99,18,10751,14,36,27, 10402,9648,
					 10749,878,10770,53,10752,37];
					 // this should be made directly from the API
					 //in case any are added in the future
					 // -- not likely but just in case

function selectGenreFromButton () {
	$('.movie-search-form').on('click', '.genre-button', function (event) {
		event.preventDefault();
		selectedGenre = $(this).text();
		$('button.highlightGenreButton').removeClass('highlightGenreButton');
		$(this).addClass('highlightGenreButton');
		$('.genre-button-section').removeClass(currentGenreBackground);
		//will want to get a css animation for more effectively showing
		//the currently selected genre
		renderGenreBackground();
		console.log(selectedGenre);
		});
	};

function renderGenreBackground () {
	if (selectedGenre === 'Action') {
		currentGenreBackground = 'https://cdn1.theyoungfolks.com/wp-content/uploads/2017/05/03231419/avengers-2.jpg';
		projectorText = "<h2> How about some fighting? <h2>"
		} else if (selectedGenre === 'Adventure') {
			currentGenreBackground = 'https://s-media-cache-ak0.pinimg.com/originals/57/98/06/579806ee0123a59c35f8b006c15578d5.jpg';
			projectorText = "<h2> Feeling Adventurous eh? <h2>";
		} else if (selectedGenre === 'Animation') {
			currentGenreBackground = 'https://i.ytimg.com/vi/J6eUjbKA4yw/maxresdefault.jpg';
			projectorText = "<h2> Let your inner child out! <h2>"
		} else if (selectedGenre === 'Comedy') {
			currentGenreBackground = 'https://s-media-cache-ak0.pinimg.com/originals/68/15/2c/68152c9904f74bcefd93150786ecafc6.png';
			projectorText = "<h2> Time for some laughs! <h2>"
		} else if (selectedGenre === 'Crime') {
			currentGenreBackground = 'https://movie-screencaps.com/wp-content/uploads/2017/04/godfather-movie-screencaps.com-.jpg';
			projectorText = "<h2> Betrayal is the name of the game <h2>"
		} else if (selectedGenre === 'Documentary') {
			currentGenreBackground = 'https://i.imgur.com/1nIty7I.jpg';
			projectorText = "<h2> How about learning something new? <h2>"
		} else if (selectedGenre === 'Drama') {
			currentGenreBackground = 'http://screenmusings.org/ForrestGump/images/Forrest-Gump-0100.jpg';
			projectorText = "<h2> This could get intense... <h2>"
		} else if (selectedGenre === 'Family') {
			currentGenreBackground = 'https://typeset-beta.imgix.net/rehost%2F2016%2F9%2F13%2F323d35a7-ec0c-47cd-a4d8-ba28c15ffce9.jpg';
			projectorText = "<h2> Perfect for all ages! <h2>"
		} else if (selectedGenre === 'Fantasy') {
			currentGenreBackground = 'https://geekdad.com/wp-content/uploads/2016/11/DoctorStrange-magic.jpg';
			projectorText = "<h2> Set your imagination wild! <h2>"
		} else if (selectedGenre === 'History') {
			currentGenreBackground = 'https://i3.wp.com/designbypixl.com/wp-content/uploads/2016/05/The-Best-Disney-Movies-of-All-Time-1-2.jpg';
			projectorText = "<h2> History with a twist <h2>"
		} else if (selectedGenre === 'Horror') {
			currentGenreBackground = 'http://cinemavine.com/wp-content/uploads/2017/07/it-movie-trailer-screencaps-10.png';
			projectorText = "<h2> So you wanna be scared huh? <h2>"
		} else if (selectedGenre === 'Music') {
			currentGenreBackground = 'https://s-media-cache-ak0.pinimg.com/736x/98/37/27/9837277ca6507aa5e984d3971706561b.jpg';
			projectorText = "<h2> Sing-along time! <h2>"
		} else if (selectedGenre === 'Mystery') {
			currentGenreBackground = 'http://cdn.collider.com/wp-content/uploads/sherlock-holmes-movie-image-21.jpg';
			projectorText = "<h2> Put that thinking cap on <h2>"
		} else if (selectedGenre === 'Romance') {
			currentGenreBackground = 'https://vignette2.wikia.nocookie.net/titanic/images/3/3a/Titanic-movie-screencaps.com-22321.jpg/revision/latest?cb=20160822190406';
			projectorText = "<h2> Witness love at first sight <h2>"
		} else if (selectedGenre === 'Science Fiction') {
			currentGenreBackground = 'http://overmental.com/wp-content/uploads/2015/07/star-wars5-movie-screencaps.com-7202.jpg';
			projectorText = "<h2> Discover a whole new world <h2>"
		} else if (selectedGenre === 'TV Movie') {
			currentGenreBackground = 'https://assets1.ignimgs.com/thumbs/userUploaded/2016/10/11/blackmirror11280-1476180444633_1280w.jpg';
			projectorText = "<h2> ...these can be good... <h2>"
		} else if (selectedGenre === 'Thriller') {
			currentGenreBackground = 'https://moviescene.files.wordpress.com/2014/11/skyfall-movie-screencaps-com-26.jpg';
			projectorText = "<h2> Twists at every corner <h2>"
		}
		/*$('.genre-button-section').addClass(currentGenreBackground);*/
		//this line will be updated to change the background to the 
		//matching genre background

		$('.projector-display').html(`${projectorText} 
				<img src= ${currentGenreBackground}>
				`);
}

/*<div width= "100% height= "500px" class= ${currentGenreBackground}> </div>*/


function resetCSSAnimation(id) {
	let element = document.getElementById(id);
	let newone = element.cloneNode(true);
	element.parentNode.replaceChild(newone, element);
}

function searchMovie () {
	$('.movie-search-form').on('click', '.search-button', function(event) {
		event.preventDefault();
		/*console.log(selectedGenre);*/
		/*selectedGenre= $('.search-query').val();*/
		console.log(selectedGenre);
		if (selectedGenre !== undefined) {
		getGenreIDfromAPI(selectedGenre, changeGenreIntoGenreID);
		revealSearchResults();
		} else {
			resetCSSAnimation('genre-title');
			$('.genre-section-title').addClass('animated shake');
			console.log('no genre selected');
		}
	})
	//this is to be used with for the '.search-button'
	//will prevent the form from being submitted and
	//will get the user inputted genre

	//Movie DB sorts genres by assigning genre-id's 
}

function changeGenreIntoGenreID (data) {
	/*let movieGenre= data.genres.filter( obj => obj.name.toLowerCase() === selectedGenre.toLowerCase());*/
	let movieGenre= data.genres.find(obj => obj.name.toLowerCase() === selectedGenre.toLowerCase());
	queryGenreID = movieGenre.id;
	getDataFromMovieDBAPI(queryGenreID, getMovieData);
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
	//calls getMovieData()
	//calls showMovieTrailer()
}

function getSpecificMovieFromMovieDBAPI (movieID, callback) {
	let dataRequest = {
		api_key: 'a916990541912af1edec4ebbf21fc10f'
		/*movie_id: movieID*/
		//need to figure out which page should be selected
		//might need to further narrow search results via year
	}
	movieDB_movie_search_URL = "https://api.themoviedb.org/3/movie/" + movieID;
	console.log(movieDB_movie_search_URL);
	$.getJSON(movieDB_movie_search_URL, dataRequest, callback)
}

function getReviewsFromMovieDBAPI(moviesID, callback) {
	let dataRequest = {
		api_key:'a916990541912af1edec4ebbf21fc10f',
		movie_id: moviesID,
		page: 1
		//this is used to get the user movie reviews from Movie DB
	}
	console.log(moviesID);

	$.getJSON(movieDB_reviews_URL, dataRequest, callback);
}

function getDataFromNYTimesAPI (movieTitle, callback) {
	let dataRequest = {
		apikey: 'bc0475617d3440aa97091e213868e01d',
		query: movieTitle
	}

	$.getJSON(newYorkTimes_reviews_URL, dataRequest, callback);
}

function displayNYTimesReviews(reviewData) {
	let reviewInfo = reviewData.results[0];
	console.log(reviewInfo);
	if (reviewInfo === undefined) {
		$('.critics-section').hide();
	} else {
	let NYTimesReview= renderCriticReview(reviewInfo);
	console.log(NYTimesReview);
	$('.critics-section').html(NYTimesReview);
	}
	//this is used to display the user reviews from MovieDB
	// and/or filmcrave.com
}

function displayUserReviews(movieDBReviewData) {
	let movieDBReviews = movieDBReviewData.results.map((item, index) => renderUserReviews(item,index));
	console.log(movieDBReviewData);
	$('.watcher-opinions').html(movieDBReviews);
	showLimitedWordsForReview();
	$('.watcher-opinions').parent().show();
	$('.watcher-opinions:empty').parent().hide();
	//checks if there was no review info pulled from movieDB
	// and does not display parent container if nothing was pulled
	
	//This is used to display the user reviews from MovieDB
	// and/or filmcrave.com
}

function renderCriticReview(criticReview) {
	if (criticReview.summary_short === "" || criticReview.summary_short === null) {
		return `<h2 class= critics> What do the Critics Say? </h2>
	<div><a> ${criticReview.link.url}> Click here to Read a 
	Full Review for ${criticReview.display_title} </a></div>
	<div> Review by: ${criticReview.byline}</div></li>`
	} else {
	return `<h2 class= critics> What do the Critics Say? </h2>
	<li class= NY-times-review> ${criticReview.summary_short} 
	<div> <a href= ${criticReview.link.url}> Read Full Review </a></div>
	<div> Review by: ${criticReview.byline}</div></li>`
}
}

/*function renderUserReviews(userReview, indexNum) {
	  if (indexNum % 2 === 0) {
	  	return `<li class= "user-review user-review-right more"> ${userReview.content} 
	  | Review by: ${userReview.author} </li>`
	  } else {
	  	return `<li class= "user-review user-review-left more"> ${userReview.content} 
	  | Review by: ${userReview.author} </li>`
	  }
}*/

function renderUserReviews(userReview, indexNum) {
	  	return `<li class= "user-review more"> ${userReview.content} 
	  | Review by: ${userReview.author} </li>`
}

function showLimitedWordsForReview() {
	var showChar = 150;
	var ellipsestext = "...";
	var moretext = "Read full Review";
	var lesstext = "show less";

	$('.user-review').each(function() {
		var content = $(this).html();

		if(content.length > showChar) {

			var c = content.substr(0, showChar);
			var h = content.substr(showChar-1, content.length - showChar);

			var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';

			$(this).html(html);
		}

	});

	$(".morelink").click(function(){
		if($(this).hasClass("less")) {
			$(this).removeClass("less");
			$(this).html(moretext);
		} else {
			$(this).addClass("less");
			$(this).html(lesstext);
		}
		$(this).parent().prev().toggle();
		$(this).prev().toggle();
		return false;
	});
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

function getMovieData (data) {
	let movieListLength= data.results.length;
	movieIndex= Math.floor(Math.random() *movieListLength) +1;
	//randomly generate the movie Index
	currentMovieData = data.results[movieIndex];
	currentMovieTitle = currentMovieData.title 
	checkAlreadySuggestedMovies(currentMovieData);
	//makes sure it is not recommending a movie already seen


	/*$('.movie-header').html(`<h2 class= "movie-title"> ${currentMovieData.title} </h2>
		<img class= "movie-poster" src= ${movieDB_poster_URL}${currentMovieData.poster_path}>
		<p class= "movie-score-text"> Rating: <span class= "movie-score">
		${currentMovieData.vote_average} </span> </p>`);
	$('.movieDB-synopsis').html(`<p> ${currentMovieData.overview}</p>`);*/
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
	return `<iframe width= 100% height= 100% 
	src="https://www.youtube.com/embed/${result.id.videoId}" 
	frameborder="0" allowfullscreen></iframe>`
}

function showSelectedGenre () {
	return `<h3 class = 'genre-description'> This movie has the genre 
	<span class= 'genre-name'> <p class= 'btn btn-red'> ${selectedGenre}</p> </button><span></h3>`
}

function hideSearchResults() {
	$('.movie-info').hide();
	//hides all movie sections if nothing has 
	//been search yet
}

function hideGenreSelectionSection() {
	$('.genre-selection-section').hide();
}

function revealGenreSelectionSection() {
	$('.genre-selection-section').show();
}

function hideWatchList() {
	$('.watch-list').hide();
}

function revealWatchlist() {
	$('.watch-list').show();
}

function revealSearchResults() {
	$('.movie-info').show();
}

function handleRandomMovieButton() {
	$('.movie-search-form').on('click', '.random-search-button', function (event) {
		event.preventDefault();
		movieIndex = 0;
		let randomizedGenre = movieDBGenres[Math.floor(Math.random()*movieDBGenres.length)];
		queryGenreID = randomizedGenre;
		getGenreIDfromAPI(queryGenreID, changeGenreIDIntoGenre);
		getDataFromMovieDBAPI(queryGenreID, getMovieData);
		revealSearchResults();
		$("html, body").animate({ scrollTop: 0 }, 600);
    		return false;
		});
}

function changeGenreIDIntoGenre (data) {
	let genreName = data.genres.find(obj => obj.id === queryGenreID)
	selectedGenre = genreName.name;
}

function handleNextSuggestionButton() {
	$('.movie-search-form').on('click', '.next-movie-button', function(event) {
		event.preventDefault();
		/*AlreadySuggested.push(currentMovieTitle);*/
		pickanothermovie();
		$("html, body").animate({ scrollTop: 0 }, 600);
    		return false;
		});
}

function handleWatchListButton() {
	$('.movie-search-form').on('click', '.watch-list-button', function (event) {
		event.preventDefault();
		console.log('WORKS');
		if(userWatchList.find(movie => movie === currentMovieTitle)) {
			console.log('movie already in database');
		} else {
			addMovieToWatchlist();
		}
		revealWatchlist();
	});
}

function handlePickAnotherGenreButton() {
	$('.movie-search-form').on('click', '.pick-another-genre-button', function (event) {
		event.preventDefault();
		hideSearchResults();
		revealGenreSelectionSection();
		$("html, body").animate({ scrollTop: 0 }, 600);
    		return false;
		});
}

function addMovieToWatchlist() {
	userWatchList.push(currentMovieTitle);
	let newWatchListMovie = userWatchList[userWatchList.length-1];
	let newestItem = renderMovieToWatchlist(newWatchListMovie);
	/*let movieList = userWatchList.map((item, index) => renderMovieToWatchlist(item));*/
	$('.userList').append(newestItem);
	$("html, body").animate({ scrollTop: 0 }, 600);
    return false;
}

function renderMovieToWatchlist(moviename) {
	return `<li> <a href= '' listed-movie-id= ${movieID} class= 'watch-list-item'>${moviename}</a></li>`
}

function showWatchlistMovieInformation() {
	$('.watch-list').on('click', '.watch-list-item', function (event) {
		event.preventDefault();
		console.log($(this).text());
		currentMovieTitle = $(this).text();
		movieID= $(this).attr('listed-movie-id');
		getSpecificMovieFromMovieDBAPI(movieID, displayMovieInformation);
	/*	getDataFromYoutubeAPI(currentMovieTitle, showMovieTrailer);
		getDataFromNYTimesAPI(currentMovieTitle, displayNYTimesReviews);*/
	});
}

function pickanothermovie() {
	getDataFromMovieDBAPI(queryGenreID, getMovieData);
	};
	//add the movie to the AlreadySuggested array
	// prevent form submission for '.next-movie-button'
	//runs getMovieData() again
	//again

function checkAlreadySuggestedMovies(currentMovieData) {
	if (AlreadySuggested.find(movie => movie === currentMovieTitle)) {
			pickanothermovie();
		} else { 
		$('.movie-header').html(`<h2 class= "movie-title"> ${currentMovieData.title} </h2>
		<img class= "movie-poster border" src= ${movieDB_poster_URL}${currentMovieData.poster_path}>
		`);
		$('.movieDB-synopsis').html(`<p class= "movie-score-text"> <i class="fa fa-star" aria-hidden="true"></i> <span class= 'underline'>  Rating:</span> <i class="fa fa-star" aria-hidden="true"></i><span class= "movie-score">
		${currentMovieData.vote_average} </span> </p> <p> ${currentMovieData.overview}</p>`);
		$('.genre-type-info').html(showSelectedGenre);

		AlreadySuggested.push(currentMovieTitle);
		//this line adds the movie to the list of already shown movies
		movieID = currentMovieData.id;
		console.log(movieID);
		movieDB_reviews_URL = "https://api.themoviedb.org/3/movie/" + movieID + "/reviews";
		getDataFromYoutubeAPI(currentMovieTitle, showMovieTrailer);
		getDataFromNYTimesAPI(currentMovieTitle, displayNYTimesReviews);
		getReviewsFromMovieDBAPI(movieID, displayUserReviews);
		hideGenreSelectionSection();

		}
	};

function displayMovieInformation(currentMovieData) {
	$('.movie-header').html(`<h2 class= "movie-title"> ${currentMovieData.title} </h2>
		<img class= "movie-poster border" src= ${movieDB_poster_URL}${currentMovieData.poster_path}>
		`);
	$('.movieDB-synopsis').html(`<p class= "movie-score-text"> Rating: <span class= "movie-score">
		${currentMovieData.vote_average} </span> </p>
		<p> ${currentMovieData.overview}</p>`);
	$('.genre-type-info').html(showSelectedGenre);
	console.log(currentMovieTitle);
	getDataFromYoutubeAPI(currentMovieTitle, showMovieTrailer);
	getDataFromNYTimesAPI(currentMovieTitle, displayNYTimesReviews);
	getReviewsFromMovieDBAPI(movieID, displayUserReviews);
	hideGenreSelectionSection();
	revealSearchResults();
}
		//this is only for pulliung up watchlist movies
		//ignores AlreadySuggested array

/*About Me Modal Popup*/
// Get the modal
let modal = document.getElementById('myModal');
let overlay = document.getElementById('overlay');

function closeModal() {
	$('.modal-content').on('click', '.close-modal-button', function (event) {
		event.preventDefault();
		modal.style.display = "none";
		overlay.style.display = "none";
	})
}

function openAboutMe() {
	modal.style.display = "block";
}

$(closeModal());
$(selectGenreFromButton());
$(searchMovie());
$(handleRandomMovieButton());
$(handleNextSuggestionButton());
$(handleWatchListButton());
$(showWatchlistMovieInformation());
$(handlePickAnotherGenreButton());
$(showLimitedWordsForReview());
hideSearchResults();
hideWatchList();
openAboutMe();