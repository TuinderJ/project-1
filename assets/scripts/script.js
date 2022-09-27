document.getElementById("submit-btn").addEventListener("click", test);

function test(e) {
  e.preventDefault();
  const searchBar = document.getElementById("search");
  const criteria = document.getElementById("criteria");
  location.href = `results.html?search=${search.value}&searchType=${criteria.value}`;
}
