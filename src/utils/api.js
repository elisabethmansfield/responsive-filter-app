/**
 * api.js
 * Define methods and flow for retrieving data from the Fixer.io API.
 */

const fetch = require('cross-fetch');
// Personal API key, required for query.
const API_key = '305acc6d9e93e8b14a7a0e8f2112eeeb';

// Construct the API lookup url per requested currency.
const makeUrl = (base) => {
  let url = 'http://data.fixer.io/api/latest?access_key=' + API_key; 
      url += '&base=' + base;
  return url;
};

// Convert API results into Javascript object.
const postProcess = (data) => {
  let currencies = Object.keys(data.rates);
  let conversions = Object.values(data.rates);
  return { currencies, conversions };
};

// Call the API via fetch.
const getData = (url, options) => {
  let params = {
    method: 'GET'
  };
  return fetch(url, params)
    .then(response => {
      if (response.status !== 200) {
        throw response;
      }
      return response.json();
    })
    .catch(console.error);
};

// Construct url and call API via asynchronous Promise.
const apiCall = (base) => {
  let url = makeUrl(base);
  return new Promise( (resolve, reject) => {
    let p = getData(url);
    p.then(postProcess).then(values => {
      console.log("API Results:",values);
      resolve(values);
    });
    p.catch(reject);
  });
};

module.exports = apiCall;
