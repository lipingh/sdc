const axios = require('axios');
const options = require('./src/config/config');

const baseUrl = 'http://localhost:3000';
// const baseUrl = 'http://3.17.150.126:3000';
const getReviewsMeta = (productId) => axios({
  url: `${baseUrl}/reviews/meta?product_id=${productId}`,
  method: 'get',
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
  `${baseUrl}/reviews/${reviewId}/helpful`,
  {
    helpfulness: helpful,
  },
)
  .then()
  .catch((err) => {
    throw err;
  });

const reportReview = (reviewId) => axios.put(
  `${baseUrl}/reviews/${reviewId}/report`, {},
)
  .then()
  .catch((err) => {
    throw err;
  });

const postReview = (data) => axios.post(`${baseUrl}/reviews`, data, { headers: options.headers })
  .then()
  .catch((err) => Promise.reject(err));

module.exports = {
  getReviewsMeta,
  getProductInfo,
  updateReviewHelpful,
  reportReview,
  postReview,
};
