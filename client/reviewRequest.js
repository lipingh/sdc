const axios = require('axios');
const options = require('./src/config/config.js');

const getReviewsById = (params) => new Promise((resolve, reject) => {
  axios({
    url: `${options.url}reviews/`,
    method: 'get',
    headers: options.headers,
    params,
  })
    .then((res) => resolve(res.data.results))
    .catch((err) => reject(err));
});

const getReviewsMeta = (productId) => new Promise((resolve, reject) => axios({
  url: `${options.url}reviews/meta?product_id=${productId}`,
  method: 'get',
  headers: options.headers,
})
  .then((res) => resolve(res.data))
  .catch((err) => reject(err)));

module.exports = { getReviewsById, getReviewsMeta };
