const { pool } = require('../db/index');

const getReviews = (req, res) => {
  const productId = parseInt(req.params.product_id, 10);
  pool.query('SELECT * from reviews WHERE product_id = $1 and reported= false LIMIT 5', [productId], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const getReviewsMeta = (req, res) => {
  const productId = parseInt(req.params.product_id, 10);
  pool.query('SELECT COUNT(id), rating, recommend from reviews WHERE product_id = $1 GROUP BY rating, recommend', [productId], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const getCharacteristics = (req, res) => {
  const productId = parseInt(req.params.product_id, 10);
  pool.query('SELECT characteristic_id, "value" from characteristic_reviews INNER JOIN characteristics ON characteristic_reviews.id = characteristics.id WHERE characteristics.product_id = $1;', [productId], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const updateReviewHelpful = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { helpfulness } = req.body;

  pool.query('UPDATE reviews SET helpfulness = $1 WHERE id = $2', [helpfulness, id], (err) => {
    if (err) {
      throw err;
    }
    res.status(200).send('ok!');
  });
};

const updateReviewReport = (req, res) => {
  const id = parseInt(req.params.id, 10);
  pool.query('UPDATE reviews SET reported = true WHERE id = $1', [id], (err) => {
    if (err) {
      throw err;
    }
    res.status(200).send('ok!');
  });
};

const postReview = (req, res) => {
  const {
    product_id, rating, summary, body, recommend, name, email, photos, characteristics,
  } = req.body;
  const date = new Date().getTime();
  const params = [product_id, rating, date, summary, body, recommend, name, email];

  pool.query('INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email) VALUES($1, $2, $3, $4, $5, $6, $7)', params, (err) => {
    if (err) {
      throw err;
    }
    res.status(200).send('ok');
  });
  // TO DO: update the reviews_photos
  // TO DO: update the characteristics
  // TO DO: update the characteristics_reviews
};

module.exports = {
  getReviews,
  getReviewsMeta,
  getCharacteristics,
  updateReviewHelpful,
  updateReviewReport,
  postReview,
};
