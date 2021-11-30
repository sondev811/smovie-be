const needle = require('needle');
require('dotenv').config();
//Env 
const API_BASE_URL = process.env.API_BASE_URL;
const API_KEYS = process.env.API_KEYS;
const API_RATING = process.env.API_RATING;
const HEADER_KEYS = process.env.HEADER_KEYS;

const getURL = async (url, paramsURL = {}) => {
    const headers = {
      'Content-Type': 'application/json'
    }
    const params = handleParams(paramsURL);
    const api = await needle('get', `${API_BASE_URL}${url}?${params}`, { headers: headers });
    return api;
}

const handleParams = (param) => {
    const params = new URLSearchParams({
        api_key: API_KEYS,
        language: 'en-US',
        append_to_response: 'external_ids'
    });
    const keys = Object.keys(param);
    const values = Object.values(param);
    if (!keys || !keys.length || !values || !values.length) {
      return params;
    }
    keys.forEach((item, index) => {
        params.append(item, values[index]);
    });
    return params;
}

const getRating = async (imdbID) => {
  const headers = {
    'Content-Type': 'application/json',
    'x-rapidapi-host': 'imdb8.p.rapidapi.com',
    'x-rapidapi-key': HEADER_KEYS
  }
  const params = new URLSearchParams({
    tconst: imdbID
  });
  const api = await needle('get', `${API_RATING}?${params}`, { headers: headers });
  return api;
}

module.exports = { getURL, getRating };