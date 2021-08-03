const axios = require('axios');
const options = require('./src/config/config');

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

const getProductInfo = (id) => axios({
  url: `${options.url}products/${id}`,
  method: 'get',
  headers: options.headers,
})
  .then((res) => res.data)
  .catch((err) => Promise.reject(err));

const updateReviewHelpful = (reviewId, helpful) => axios.put(
  `${options.url}reviews/${reviewId}/helpful`,
  {
    helpfulness: helpful,
  },
  {
    headers: options.headers,
  },
)
  .then()
  .catch((err) => {
    throw err;
  });

const reportReview = (reviewId) => axios.put(
  `${options.url}reviews/${reviewId}/report`, {},
  {
    headers: options.headers,
  },
)
  .then()
  .catch((err) => {
    throw err;
  });

module.exports = {
  getReviewsById,
  getReviewsMeta,
  getProductInfo,
  updateReviewHelpful,
  reportReview,
};
