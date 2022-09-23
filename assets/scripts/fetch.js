function getSearchResults({ searchBar, searchBy, year, page }) {
  let queryParams = "";

  if (searchBy === "IMDb ID") queryParams += `&i=${searchBar}`;
  if (searchBy === "Title") queryParams += `&s=${searchBar}`;
  if (year) queryParams += `&y=${year}`;
  if (page) queryParams += `&page=${page}`;

  const omdbURL = `http://www.omdbapi.com/?apikey=${omdbKey}&type=movie${queryParams}`;
  fetch(omdbURL)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      const header = document.createElement("h2");
      header.textContent = "Search Results";
      document.body.appendChild(header);
      if (searchBy !== "IMDb ID") {
        data.Search.forEach(result => {
          if (result.Poster !== "N/A") {
            const poster = document.createElement("img");
            poster.setAttribute("src", result.Poster);
            document.body.appendChild(poster);
          }
        });
      } else {
        const poster = document.createElement("img");
        poster.setAttribute("src", data.Poster);
        document.body.appendChild(poster);
      }
    });
}

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
      const header = document.createElement("h2");
      header.textContent = "Upcoming";
      document.body.appendChild(header);
      data.results.forEach(result => {
        const poster = document.createElement("img");
        poster.setAttribute("src", imgBaseURL + fileSize + result.poster_path);
        document.body.appendChild(poster);
      });
    });
}

let search = {
  // Next 2 lines are for searching by ID
  // searchBar: "tt2380307",
  // searchBy: "IMDb ID",
  // Next 2 lines are for searching by title
  searchBar: "coco",
  searchBy: "Title",
  // year: "2020",
  // page: "1",
};
getSearchResults(search);
getUpcoming();
