document.getElementById("submit-btn").addEventListener("click", test);

function test(e) {
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

var imgEl = document.querySelectorAll("img");

function getUpcoming() {
  const tmdbURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdbKey}`;
  const imgBaseURL = "https://image.tmdb.org/t/p/";
  const fileSize = "w300";
  fetch(tmdbURL)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      for (var i = 0; i < 10; i++) {
        imgEl[i].setAttribute("src", imgBaseURL + fileSize + data.results[i].poster_path);
        }
    });
}
 getUpcoming();