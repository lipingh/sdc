const { pool } = require('../db/index');

const getReviews = (req, res) => {
  const productId = parseInt(req.query.product_id, 10);
  const page = parseInt(req.query.page, 10);
  const count = parseInt(req.query.count, 10);
  const skip = (page - 1) * count;

  // pool.query('SELECT id as review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness from reviews WHERE product_id = $1 and reported = false LIMIT $2 OFFSET $3', [productId, data.count, skip], (err, results) => {
  //   if (err) {
  //     throw err;
  //   }
  //   data.results = results.rows;
  //   res.status(200).json(data);
  // });
  pool.query('SELECT * from reviews_view WHERE product = $1 LIMIT $2 OFFSET $3', [productId, count, skip], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows[0]);
  });
};

const getReviewsMeta = (req, res) => {
  const productId = parseInt(req.query.product_id, 10);
  // const data = {};
  // data.product_id = productId;
  // pool.query('SELECT ratings FROM reviews_meta_ratings WHERE product_id = $1;', [productId], (ratingErr, rating) => {
  //   if (ratingErr) {
  //     throw ratingErr;
  //   }
  //   data.ratings = rating.rows[0].ratings;
  //   pool.query('SELECT recommended FROM reviews_meta_recommended WHERE product_id = $1;', [productId], (recommendErr, recommend) => {
  //     if (recommendErr) {
  //       throw recommendErr;
  //     }
  //     data.recommended = recommend.rows[0].recommended;
  //     pool.query('SELECT characteristics FROM reviews_meta_characteristics WHERE product_id = $1;', [productId], (err, characteristic) => {
  //       if (err) {
  //         throw err;
  //       }
  //       data.characteristics = characteristic.rows[0].characteristics;
  //       res.status(200).json(data);
  //     });
  //   });
  // });

  pool.query('SELECT * FROM reviews_meta WHERE product_id = $1', [productId], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json(results.rows[0]);
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
  let last_id;
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
  updateReviewHelpful,
  updateReviewReport,
  postReview,
};
