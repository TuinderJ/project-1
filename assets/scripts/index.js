const history = JSON.parse(localStorage.getItem("movie-history"));

const previousMovies = document.getElementById("previous-movies");

history.forEach(movieID => {
  const tmdbURL = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${tmdbKey}`;
  fetch(tmdbURL)
    .then(response => {
      return response.json();
    })
    .then(movie => {
      const previousMovieContainer = document.createElement("div");
      previousMovieContainer.setAttribute("class", "previous-movie");
      previousMovieContainer.setAttribute("data-id", movie.id);

      const imgBaseURL = "https://image.tmdb.org/t/p";
      const fileSize = "/w200";
      const previousMoviePoster = document.createElement("img");
      previousMoviePoster.setAttribute("src", `${imgBaseURL}${fileSize}${movie.poster_path}`);

      const previousMovieTitle = document.createElement("h3");
      previousMovieTitle.textContent = movie.title;

      previousMovieContainer.appendChild(previousMoviePoster);
      previousMovieContainer.appendChild(previousMovieTitle);

      previousMovies.appendChild(previousMovieContainer);
    });
});

document.getElementById("submit-btn").addEventListener("click", btnClick);
previousMovies.addEventListener("click", e => {
  if (e.target.matches(".previous-movie")) {
    location.href = `./full-description.html?i=${e.target.dataset.id}`;
  } else if (e.target.closest(".previous-movie")) {
    location.href = `./full-description.html?i=${e.target.parentElement.dataset.id}`;
  }
});
function btnClick(e) {
  e.preventDefault();
  const searchBar = document.getElementById("search");
  const criteria = document.getElementById("criteria");
  handleRedirect({ searchBar: searchBar.value, searchBy: criteria.value });
}

function handleRedirect({ searchBar, searchBy, year }) {
  if (searchBy === "IMDb ID") location.href = `./details.html?i=${searchBar}`;
  if (searchBy === "Title") {
    let queryParams = "";
    if (searchBy === "Title") queryParams += `query=${searchBar}`;
    if (year) queryParams += `&year=${year}`;
    location.href = `./results.html?${queryParams}`;
  }
}
