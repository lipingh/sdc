const { pool } = require('../db/index');

const getReviews = (req, res) => {
  const productId = parseInt(req.query.product_id, 10);
  const pageNUmber = parseInt(req.query.page, 10);
  const pageSize = parseInt(req.query.count, 10);
  const sort = req.query.sort === 'newest' ? 'date' : 'helpfulness';
  const offset = (pageNUmber - 1) * pageSize;
  pool.query(`SELECT t1.review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness, COALESCE(photos, '[]'::json) as photos from
 (SELECT id as review_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness from reviews WHERE product_id = $1 and reported = false ORDER BY ${sort} DESC LIMIT $2 OFFSET $3) as t1
 left Join
 (SELECT review_id, json_agg(json_build_object('id', id, 'url', "url")) as photos from reviews_photo where review_id in (select id from reviews WHERE product_id = $1 and reported = false ORDER BY helpfulness DESC LIMIT 5) GROUP BY review_id) as t2
  on t1.review_id = t2.review_id`, [productId, pageSize, offset], (err, results) => {
    if (err) {
      throw err;
    }
    res.status(200).json({ results: results.rows });
  });
};

const getReviewsMeta = (req, res) => {
  const productId = parseInt(req.query.product_id, 10);
  const sqlQuery = `select t1.product_id, ratings, recommended, characteristics
  from
      (select product_id, json_object_agg("rating", "count") as ratings
       from (select product_id, rating, count(id)
              from reviews where product_id = $1
              group by product_id, rating) as r
        group by product_id) as t1
  inner join
      (select product_id, json_object_agg("name", json_build_object('id', characteristic_id, 'value', avg)) AS characteristics
      from (select product_id, name, characteristic_id, AVG(value) from
              (select product_id, id, name from characteristics where product_id = $1) as c1
              inner join characteristic_reviews on
              c1.id = characteristic_reviews.characteristic_id
              GROUP BY product_id, name, characteristic_id) as c2
       group by product_id) as t2 on t1.product_id = t2.product_id
  inner join
      (Select product_id, json_object_agg("recommend", "count") as recommended
        from (SELECT product_id, recommend, COUNT(*)
              FROM reviews WHERE product_id = $1
              GROUP BY product_id, recommend) as re
        group by product_id
      ) as t3 on t1.product_id = t3.product_id`;

  pool.query(sqlQuery, [productId], (err, results) => {
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

    // insert into the characteristics_reviews
    Object.keys(characteristics).forEach((key) => {
      pool.query('INSERT INTO characteristic_reviews(review_id, characteristic_id) VALUES($1, $2)', [reviewId, key], (charError) => {
        if (charError) {
          throw charError;
        }
      });
    });
    res.status(200).send('ok');
  });
};

module.exports = {
  getReviews,
  getReviewsMeta,
  updateReviewHelpful,
  updateReviewReport,
  postReview,
};
