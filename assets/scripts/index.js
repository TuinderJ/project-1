let history = JSON.parse(localStorage.getItem("movie-history"));
if (history === null) history = [];

const previousMovies = document.getElementById("previous-movies");

history.forEach(movieID => {
  const tmdbURL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${tmdbKey}`;
  fetch(tmdbURL)
    .then(response => {
      return response.json();
    })
    .then(movie => {
      const previousMovieContainer = document.createElement("div");
      previousMovieContainer.setAttribute("class", "previous-movie flex flex-col");
      previousMovieContainer.setAttribute("data-id", movie.id);

      const imgBaseURL = "https://image.tmdb.org/t/p";
      const fileSize = "/w200";
      const previousMoviePoster = document.createElement("img");
      previousMoviePoster.setAttribute("class", "cursor-pointer");
      previousMoviePoster.style.width = "200px";
      previousMoviePoster.setAttribute("src", `${imgBaseURL}${fileSize}${movie.poster_path}`);

      const previousMovieTitle = document.createElement("h3");
      previousMovieTitle.setAttribute("class", "flex");
      previousMovieTitle.textContent = movie.title;

      previousMovieContainer.appendChild(previousMoviePoster);
      previousMovieContainer.appendChild(previousMovieTitle);

      previousMovies.appendChild(previousMovieContainer);
    });
});

document.getElementById("submit-btn").addEventListener("click", handleRedirect);

previousMovies.addEventListener("click", e => {
  if (e.target.matches("img")) {
    location.href = `./full-description.html?i=${e.target.parentElement.dataset.id}`;
  }
});

function handleRedirect(e) {
  e.preventDefault();
  const searchBar = document.getElementById("search");
  if (searchBar !== "") location.href = `./results.html?query=${searchBar.value}`;
}
