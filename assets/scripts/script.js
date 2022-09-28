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
