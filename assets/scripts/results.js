let inputQueryParams = location.search;
if (inputQueryParams === "") location.href = "./index.html";
inputQueryParams = inputQueryParams.substring(1);
inputQueryParams = inputQueryParams.split("&");
let queryParams = "";
let query = "";
inputQueryParams.forEach(paramater => {
  queryParams += paramater + "&";
  splitParam = paramater.split("=");
  if (splitParam[0] === "query") {
    query = splitParam[1];
  }
});

const tmdbURL = `https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&${queryParams}`;
fetch(tmdbURL)
  .then(response => {
    return response.json();
  })
  .then(data => {
    const imgBaseURL = "https://image.tmdb.org/t/p";
    const fileSize = "/w300";
    data.results.forEach(movie => {
      const container = document.createElement("div");
      container.setAttribute("class", "container mx-auto px-4 py-8 flex grid-rows-1 content-start space-x-3.5");
      if (movie.poster_path !== null) {
        const poster = document.createElement("img");
        poster.setAttribute("src", `${imgBaseURL}${fileSize}${movie.poster_path}`);
        poster.setAttribute("class", "max-w-sm max-h-64 rounded");
        container.appendChild(poster);
      }

      const innerContainer = document.createElement("div");
      const title = document.createElement("h3");
      title.setAttribute("class", "text-lg font-bold");
      title.textContent = movie.title;
      innerContainer.appendChild(title);

      const overview = document.createElement("p");
      overview.setAttribute("class", "text-center");
      overview.textContent = movie.overview;
      innerContainer.appendChild(overview);

      const linkToDetails = document.createElement("p");
      linkToDetails.setAttribute("class", "text-center text-amber-700");
      const link = document.createElement("a");
      link.setAttribute("href", `./full-description.html?i=${movie.id}`);
      link.textContent = "Go to movie's full description";
      linkToDetails.appendChild(link);
      innerContainer.appendChild(linkToDetails);

      container.appendChild(innerContainer);
      document.getElementById("search-results").appendChild(container);
    });
    const pages = document.getElementById("pages");
    if (data.total_pages < 5) {
      for (let page = 1; page < data.total_pages.length + 1; page++) {
        const pageNumber = document.createElement("li");
        const a = document.createElement("a");
        a.textContent = page;
        a.href = `./results.html?query=${query}&page=${page}`;
        pageNumber.appendChild(a);
        pages.appendChild(pageNumber);
      }
    } else {
      for (let page = 1; page < 6; page++) {
        const pageNumber = document.createElement("li");
        const a = document.createElement("a");
        a.textContent = page;
        a.href = `./results.html?query=${query}&page=${page}`;
        pageNumber.appendChild(a);
        pages.appendChild(pageNumber);
      }
    }
  });

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
      previousMovieContainer.setAttribute("class", "previous-movie cursor-pointer");
      previousMovieContainer.setAttribute("data-id", movie.id);

      const imgBaseURL = "https://image.tmdb.org/t/p";
      const fileSize = "/w200";
      const previousMoviePoster = document.createElement("img");
      previousMoviePoster.setAttribute("src", `${imgBaseURL}${fileSize}${movie.poster_path}`);
      previousMoviePoster.setAttribute("class", "max-w-xs max-h-52 rounded");

      const previousMovieTitle = document.createElement("h3");
      previousMovieTitle.textContent = movie.title;

      previousMovieContainer.appendChild(previousMoviePoster);
      previousMovieContainer.appendChild(previousMovieTitle);

      previousMovies.appendChild(previousMovieContainer);
    });
});

previousMovies.addEventListener("click", e => {
  if (e.target.matches(".previous-movie")) {
    location.href = `./full-description.html?i=${e.target.dataset.id}`;
  } else if (e.target.closest(".previous-movie")) {
    location.href = `./full-description.html?i=${e.target.parentElement.dataset.id}`;
  }
});
