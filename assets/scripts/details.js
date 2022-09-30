let tmdbMovieID;

let inputQueryParams = location.search;
if (inputQueryParams === "") location.href = "./index.html";
inputQueryParams = inputQueryParams.substring(1);
inputQueryParams = inputQueryParams.split("&");
inputQueryParams.forEach(paramater => {
  let dataset = paramater.split("=");
  if (dataset[0] === "i") tmdbMovieID = dataset[1];
});

let history = JSON.parse(localStorage.getItem("movie-history"));
if (history === null) history = [];
if (!history.includes(tmdbMovieID)) {
  history.unshift(tmdbMovieID);
  if (history.length > 4) history.splice(4);
}
localStorage.setItem("movie-history", JSON.stringify(history));

const tmdbURL = `https://api.themoviedb.org/3/movie/${tmdbMovieID}?api_key=${tmdbKey}`;
fetch(tmdbURL)
  .then(response => {
    return response.json();
  })
  .then(data => {
    return data.imdb_id;
  })
  .then(imdbID => {
    const omdbURL = `http://www.omdbapi.com/?apikey=${omdbKey}&i=${imdbID}&plot=ful`;
    fetch(omdbURL)
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
       document.getElementById("movie-title").textContent = data.Title + "(" + data.Year + ")";
       document.getElementById("poster").src = data.Poster;
       document.getElementById("plot").textContent = data.Plot;
       document.getElementById("actors").textContent = data.Actors;
       document.getElementById("genre").textContent = data.Genre;
       //document.getElementById("writer").textContent = data.Writer;
       //document.getElementById("director").textContent = data.Director;
       //document.getElementById("box-office").textContent = data.Boxoffice;
       const ratingsContainer = document.getElementById("ratings")
       for (let i = 0; i < data.Ratings.length; i++) {
        const rating = data.Ratings[i];
        console.log(rating)
        const div = document.createElement("div");
        const source = document.createElement("h3");
        const value = document.createElement("p");
        source.textContent = rating.Source;
        value.textContent = rating.Value;
        source.setAttribute("class", "text-amber-600 underline font-bold m-8-0 line-height-4");
        value.setAttribute("class", "text-center leading-8");
        ratingsContainer.appendChild(div);
        div.appendChild(source);
        div.appendChild(value);

       }
        // console.log(data);
      });
  });
