// var imgEl = document.querySelectorAll("img");

// function getUpcoming() {
//   const tmdbURL = `https://api.themoviedb.org/3/movie/upcoming?api_key=${tmdbKey}`;
//   const imgBaseURL = "https://image.tmdb.org/t/p/";
//   const fileSize = "w300";
//   fetch(tmdbURL)
//     .then(response => {
//       return response.json();
//     })
//     .then(data => {
//       console.log(data);
//       for (var i = 0; i < 10; i++) {
//         imgEl[i].setAttribute("src", imgBaseURL + fileSize + data.results[i].poster_path);
//         }
//     });
// }
//  getUpcoming();
// getSearchResults({
// Next 2 lines are for searching by ID
// searchBar: "tt2380307",
// searchBy: "IMDb ID",
// Next 2 lines are for searching by title
// searchBar: "coco",
// searchBy: "Title",
// year: "2020",
// page: "1",
// });
// getUpcoming();
