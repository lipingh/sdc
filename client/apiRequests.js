const axios = require('axios');
const options = require('./src/config/config');

const getReviewsMeta = (productId) => axios({
  url: `/reviews/meta?product_id=${productId}`,
  method: 'get',
})
  .then((res) => res.data)
  .catch((err) => Promise.reject(err));

const getProductInfo = (id) => axios({
  url: `products/${id}`,
  method: 'get',
  headers: options.headers,
})
  .then((res) => res.data)
  .catch((err) => Promise.reject(err));

const updateReviewHelpful = (reviewId, helpful) => axios.put(
  `/reviews/${reviewId}/helpful`,
  {
    helpfulness: helpful,
  },
)
  .then()
  .catch((err) => {
    throw err;
  });

const reportReview = (reviewId) => axios.put(
  `/reviews/${reviewId}/report`, {},
)
  .then()
  .catch((err) => {
    throw err;
  });

const postReview = (data) => axios.post('/reviews', data, { headers: options.headers })
  .then()
  .catch((err) => Promise.reject(err));

module.exports = {
  getReviewsMeta,
  getProductInfo,
  updateReviewHelpful,
  reportReview,
  postReview,
};
