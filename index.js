const API_KEY = "api_key=c340072ea235d4bd39319e94fa30dccd";
const BASE_URL = "http://api.themoviedb.org/3";
const API_URL = BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500";
const searchURL =  BASE_URL+'/search/movie?'+API_KEY;

const row = document.querySelector(".row");
const form = document.querySelector(".d-flex");
const search = document.querySelector(".form-control");

async function getMovies(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    App(data.results);
  } catch (err) {}
}

getMovies(API_URL);

function App(data) {
  row.innerHTML = "";
  data.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("col");
    movieContainer.innerHTML = `
            <div>
              <div class="card">
                <img src="${
                  IMG_URL + movie.poster_path
                }" class="imagenCard card-img-top"/>
                <div class="titleVote">
                  <h5 class="card-title">${movie.title}</h5>
                  <span class="score">${movie.vote_average}/10</span>
                </div>
              <div class="cardOverview" tabindex="0" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="Disabled popover">
                <div class="card-body">
                  <h5 class="card-title">${movie.title}</h5>
                  <h6 class="card-data">${movie.release_date}</h6>
                  <p class="card-text">${movie.overview}</p>
                  <span class="score">${movie.vote_average}/10
                  </span>
                </div>
              </div>
              </div>
            </div>`;
    row.appendChild(movieContainer);
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const searchTerm = search.value;

  if(searchTerm){
    getMovies(searchURL+'&query='+searchTerm)
  }else{
    getMovies(API_URL);
  }
})
