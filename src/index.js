import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

const api = "https://covid19.mathdro.id/api/countries";
const errors = document.querySelector(".errors");
const loading = document.querySelector(".loading");
const cases = document.querySelector(".translation");
const results = document.querySelector(".result-container");
results.style.display = "none";
loading.style.display = "none";
errors.textContent = "";
// grab the form
const form = document.querySelector(".form-data");
// grab the country name
const country = document.querySelector(".country-name");

const subscriptionKey = "9a624158ef2949fcb5a695f60ea0823a";
const endpoint = "https://api.cognitive.microsofttranslator.com";

// Add your location, also known as region. The default is global.
// This is required if using a Cognitive Services resource.
const location = "koreacentral";

const translate = async text => {
  await axios({
    baseURL: endpoint,
    url: '/translate',
    method: 'post',
    headers: {
      'Ocp-Apim-Subscription-Key': subscriptionKey,
      'Ocp-Apim-Subscription-Region': location,
      'Content-type': 'application/json',
      'X-ClientTraceId': uuidv4().toString()
    },
    params: {
      'api-version': '3.0',
      'from': 'en',
      'to': ['zh', 'it']
    },
    data: [{
      'text': text
    }],
    responseType: 'json'
  }).then(function (response) {
    loading.style.display = "none";
    cases.textContent = response.data[0].translations[0].text;
    results.style.display = "block";
    alert(JSON.stringify(response.data, null, 4));
  })
}

// declare a method to search by country name
const searchForCountry = async countryName => {
  loading.style.display = "block";
  errors.textContent = "";
  try {
    const response = await axios.get(`${api}/${countryName}`);
    loading.style.display = "none";
    cases.textContent = response.data.confirmed.value;
    results.style.display = "block";
  } catch (error) {
    loading.style.display = "none";
    results.style.display = "none";
    errors.textContent = "We have no data for the country you have requested.";
  }
};

// declare a function to handle form submission
const handleSubmit = async e => {
  e.preventDefault();
  translate(country.value)
  console.log(country.value);
};

form.addEventListener("submit", e => handleSubmit(e));