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
  const data = {};
  pool.query('SELECT rating, count FROM reviews_meta_ratings WHERE product_id = $1;', [productId], (ratingErr, rating) => {
    if (ratingErr) {
      throw ratingErr;
    }
    data.ratings = rating.rows;
    pool.query('SELECT recommend, count FROM reviews_meta_recommended WHERE product_id = $1;', [productId], (recommendErr, recommend) => {
      if (recommendErr) {
        throw recommendErr;
      }
      data.recommended = recommend.rows;
      pool.query('SELECT characteristic_id, name, value FROM reviews_meta_characteristics WHERE product_id = $1;', [productId], (err, characteristic) => {
        if (err) {
          throw err;
        }
        data.characteristics = characteristic.rows;
        // console.log(data);
        res.status(200).json(data);
      });
    });
  });
};
// const getRatings = (req, res) => {
//   const productId = parseInt(req.params.product_id, 10);
//   pool.query('SELECT * FROM reviews_meta_ratings WHERE product_id = $1;', [productId], (err, results) => {
//     if (err) {
//       throw err;
//     }
//     res.status(200).json(results.rows);
//   });
// };
// const getCharacteristics = (req, res) => {
//   const productId = parseInt(req.params.product_id, 10);
//   pool.query('SELECT * FROM reviews_meta_characteristics WHERE product_id = $1;', [productId], (err, results) => {
//     if (err) {
//       throw err;
//     }
//     res.status(200).json(results.rows);
//   });
// };

// const getRecommended = (req, res) => {
//   const productId = parseInt(req.params.product_id, 10);
//   pool.query('SELECT * FROM reviews_meta_recommended WHERE product_id = $1;', [productId], (err, results) => {
//     if (err) {
//       throw err;
//     }
//     res.status(200).json(results.rows);
//   });
// };

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
  // getRatings,
  // getCharacteristics,
  // getRecommended,
  updateReviewHelpful,
  updateReviewReport,
  postReview,
};
