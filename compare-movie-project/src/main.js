import './style.css';
import { getEl } from './mods/utils';
import movieData from './movie-data.json'


const handleSubmit = (e) => {
  e.preventDefault();
  const formObj = Object.fromEntries(new FormData(e.target));
  console.log(formObj);
  addValue(formObj);

    const form = e.target;
    const movieTitleInput = form.movieTitle.value;
    const criticScoreInput = form.criticScore.value;
    const audienceScoreInput = form.audienceScore.value;
    const domesticGrossInput = form.domesticGross.value;
    const genreInput = form.genre.value;

    document.querySelector('#movie-title-results').textContent = movieTitleInput;
    document.querySelector('#critic-score-results').textContent = criticScoreInput;
    document.querySelector('#audience-score-results').textContent = audienceScoreInput;
    document.querySelector('#domestic-total-results').textContent = domesticGrossInput;
    document.querySelector('#genre-results').textContent = genreInput;
};

const setLocalStorageKey = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const addValue = (value) => {
  const values = getLocalStorageKey('form-data') ?? [];
  setLocalStorageKey('form-data', [...values, value]);
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
};

const main = () => {
  getEl('#movie-input').addEventListener('submit', handleSubmit);
  document.getElementById('reset').addEventListener('click', resetLocalStorage);
  console.log(getValue('form-data'));
  console.log(movieData);
};

main();