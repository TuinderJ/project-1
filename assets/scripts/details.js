const omdbURL = `http://www.omdbapi.com/?apikey=${omdbKey}&type=movie`;
fetch(omdbURL)
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data);
  });
