let tmdbMovieID;

let inputQueryParams = location.search;
if (inputQueryParams === "") location.href = "./index.html";
inputQueryParams = inputQueryParams.substring(1);
inputQueryParams = inputQueryParams.split("&");
inputQueryParams.forEach(paramater => {
  let dataset = paramater.split("=");
  if (dataset[0] === "i") tmdbMovieID = dataset[1];
});

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
      });
  });
