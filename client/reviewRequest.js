const axios = require('axios');
const options = require('./src/config/config.js');

const getReviewsById = (params) => (
  axios({
    url: `${options.url}reviews/`,
    method: 'get',
    headers: options.headers,
    params,
  })
    .then((res) => res.data.results)
    .catch((err) => Promise.reject(err))
);

const getReviewsMeta = (productId) => axios({
  url: `${options.url}reviews/meta?product_id=${productId}`,
  method: 'get',
  headers: options.headers,
})
  .then((res) => res.data)
  .catch((err) => Promise.reject(err));

module.exports = { getReviewsById, getReviewsMeta }