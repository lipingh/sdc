const axios = require('axios');
const options = require('./src/config/config');

// const getReviewsById = (params) => (
//   axios({
//     url: 'http://localhost:3000/reviews/',
//     method: 'get',
//     headers: options.headers,
//     params,
//   })
//     .then((res) => res.data)
//     .catch((err) => Promise.reject(err))
// );

const getReviewsMeta = (productId) => axios({
  url: `http://3.17.150.126:3000/reviews/meta?product_id=${productId}`,
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
  `http://3.17.150.126:3000/reviews/${reviewId}/helpful`,
  {
    helpfulness: helpful,
  },
)
  .then()
  .catch((err) => {
    throw err;
  });

const reportReview = (reviewId) => axios.put(
  `http://3.17.150:3000/reviews/${reviewId}/report`, {},
)
  .then()
  .catch((err) => {
    throw err;
  });

const postReview = (data) => axios.post('http://3.17.150:3000/reviews', data, { headers: options.headers })
  .then()
  .catch((err) => Promise.reject(err));

module.exports = {
  getReviewsMeta,
  getProductInfo,
  updateReviewHelpful,
  reportReview,
  postReview,
};
