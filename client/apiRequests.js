const axios = require('axios');
const options = require('./src/config/config');

const getReviewsById = (params) => (
  axios({
    // url: `${options.url}reviews/`,
    url: 'localhost:3000/reviews/',
    method: 'get',
    headers: options.headers,
    params,
  })
    .then((res) => res.data.results)
    .catch((err) => Promise.reject(err))
);

const getReviewsMeta = (productId) => axios({
  url: `http://localhost:3000/reviews/meta?product_id=${productId}`,
  // url: `${options.url}reviews/meta?product_id=${productId}`,
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

const postReview = (data) => axios.post(`${options.url}reviews`, data, { headers: options.headers })
  .then()
  .catch((err) => Promise.reject(err));

module.exports = {
  getReviewsById,
  getReviewsMeta,
  getProductInfo,
  updateReviewHelpful,
  reportReview,
  postReview,
};
