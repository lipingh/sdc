const { pool } = require('../db/index');

const getReviews = (req, res) => {
  const productId = parseInt(req.query.product_id, 10);
  const pageNUmber = parseInt(req.query.page, 10);
  const pageSize = parseInt(req.query.count, 10);
  const { sort } = req.query;
  const offset = (pageNUmber - 1) * pageSize;
  const data = {};
  pool.query('SELECT id as review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness from reviews WHERE product_id = $1 and reported = false order by $2 DESC LIMIT $3 OFFSET $4', [productId, sort, pageSize, offset], (err, results) => {
    if (err) {
      throw err;
    }
    data.results = results.rows;
    res.status(200).json(data);
  });
  // pool.query('SELECT * from reviews_view WHERE product = $1 LIMIT $2 OFFSET $3', [productId, count, skip], (err, results) => {
  //   if (err) {
  //     throw err;
  //   }
  //   res.status(200).json(results.rows[0]);
  // });
  // pool.query('SELECT id as review_id, rating, summary, recommend, response, date, reviewer_name, helpfulness FROM getReviewsByPage($1, $2, $3, $4)', [productId, page, count, sort], (err, results) => {
  //   if (err) {
  //     throw err;
  //   }
  //   res.status(200).json(results.rows);
  // });
};

const getReviewsMeta = (req, res) => {
  const productId = parseInt(req.query.product_id, 10);
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
  const params = [product_id, rating, date, summary, body, recommend, name, email];
  // console.log(params);
  pool.query('INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reviewer_name, reviewer_email) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id', params, (err, results) => {
    if (err) {
      throw err;
    }
    const reviewId = results.rows[0].id;
    // console.log(results.rows[0].id);
    // insert into review photo
    if (photos.length) {
      photos.forEach((url) => {
        pool.query('INSERT INTO reviews_photo(review_id, url) VALUES($1, $2)', [reviewId, url], (errphoto) => {
          if (errphoto) {
            throw errphoto;
          }
          // res.status(200).send('ok');
        });
      });
    }

    // TO DO: update the characteristics
    for (const key in characteristics) {

    }
    // TO DO: update the characteristics_reviews
  });
};

module.exports = {
  getReviews,
  getReviewsMeta,
  updateReviewHelpful,
  updateReviewReport,
  postReview,
};
