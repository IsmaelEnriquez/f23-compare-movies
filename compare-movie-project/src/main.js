import './style.css';
import { getEl } from './mods/utils';
import movieData from './movie-data.json';


const handleSubmit = (e) => {
  e.preventDefault();
  const form = e.target;

  const movieTitleInput = form.movieTitle.value.trim();
  const matchedMovie = movieData.find((movie) => movie.title.toLowerCase() === movieTitleInput.toLowerCase());

  if (matchedMovie) {
    addValue(matchedMovie);
  }
};

const getLocalStorageKey = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getValue = (key) => getLocalStorageKey(key);
export const setValue = (key, names) => setLocalStorageKey(key, names);

const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const loadLocalStorage = () => {
  const values = getLocalStorageKey('form-data') || [];
  values.forEach((movie) => {
    displayOneMovie(movie);
  });
};

const addValue = (value) => {
  const values = getLocalStorageKey('form-data') || [];
  setLocalStorageKey('form-data', [...values, value]);

  displayOneMovie(value);
};

const displayOneMovie = (movie) => {
  const moviesContainer = getEl('#movies');

    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie-entry');

    const titleHeading = document.createElement('h3');
    titleHeading.textContent = movie.title;

    const criticScoreParagraph = document.createElement('p');
    criticScoreParagraph.textContent = `Critic Score: ${movie['critic score']}`;

    const audienceScoreParagraph = document.createElement('p');
    audienceScoreParagraph.textContent = `Audience Score: ${movie['audience score']}`;

    const domesticGrossParagraph = document.createElement('p');
    domesticGrossParagraph.textContent = `Domestic Gross: ${movie['domestic total']}`;

    const genreParagraph = document.createElement('p');
    genreParagraph.textContent = `Genre: ${movie.genre}`;

    movieDiv.appendChild(titleHeading);
    movieDiv.appendChild(criticScoreParagraph);
    movieDiv.appendChild(audienceScoreParagraph);
    movieDiv.appendChild(domesticGrossParagraph);
    movieDiv.appendChild(genreParagraph);

    moviesContainer.appendChild(movieDiv);
}

const renderDefaultMovies = () => {
  const moviesContainer = getEl('#movies');
  const defaultMovies = movieData.slice(0, 5);

  defaultMovies.forEach((movie) => {
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie-entry');

    const titleHeading = document.createElement('h3');
    titleHeading.textContent = movie.title;

    const criticScoreParagraph = document.createElement('p');
    criticScoreParagraph.textContent = `Critic Score: ${movie['critic score']}`;

    const audienceScoreParagraph = document.createElement('p');
    audienceScoreParagraph.textContent = `Audience Score: ${movie['audience score']}`;

    const domesticGrossParagraph = document.createElement('p');
    domesticGrossParagraph.textContent = `Domestic Gross: ${movie['domestic total']}`;

    const genreParagraph = document.createElement('p');
    genreParagraph.textContent = `Genre: ${movie.genre}`;

    movieDiv.appendChild(titleHeading);
    movieDiv.appendChild(criticScoreParagraph);
    movieDiv.appendChild(audienceScoreParagraph);
    movieDiv.appendChild(domesticGrossParagraph);
    movieDiv.appendChild(genreParagraph);

    moviesContainer.appendChild(movieDiv);
  });
};

const resetLocalStorage = () => {
  localStorage.clear();

  const moviesContainer = getEl('#movies');
  moviesContainer.textContent = '';

  renderDefaultMovies();
};

const main = () => {
  getEl('#movie-input').addEventListener('submit', handleSubmit);
  document.getElementById('reset').addEventListener('click', resetLocalStorage);

  loadLocalStorage();
  renderDefaultMovies();
};

main();

