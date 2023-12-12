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

const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const addValue = (value) => {
  const values = getLocalStorageKey('form-data') || [];
  setLocalStorageKey('form-data', [...values, value]);

  displayMovies();
};

const displayMovies = () => {
  const moviesContainer = getEl('#movies');
  const values = getLocalStorageKey('form-data') || [];

  values.forEach((movie) => {
    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie-entry');

    const titleHeading = document.createElement('h2');
    titleHeading.textContent = movie.title;

    const criticScoreParagraph = document.createElement('p');
    criticScoreParagraph.textContent = `Critic Score: ${movie.criticScore}`;

    const audienceScoreParagraph = document.createElement('p');
    audienceScoreParagraph.textContent = `Audience Score: ${movie.audienceScore}`;

    const domesticGrossParagraph = document.createElement('p');
    domesticGrossParagraph.textContent = `Domestic Gross: ${movie.domesticTotal}`;

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

const resetLocalStorage = () => {
  localStorage.clear();

  const moviesContainer = getEl('#movies');
  moviesContainer.textContent = '';
};

const main = () => {
  getEl('#movie-input').addEventListener('submit', handleSubmit);
  document.getElementById('reset').addEventListener('click', resetLocalStorage);
  console.log(getValue('form-data'));
  console.log(movieData);

  displayMovies();
};

main();

