DROP DATABASE IF EXISTS sdc;

CREATE DATABASE sdc;

\c sdc;


DROP TABLE IF EXISTS characteristic_reviews;
DROP TABLE IF EXISTS characterstic;
DROP TABLE IF EXISTS reviews_photo;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS product;
-- ---
-- Table 'product'
--
-- ---



CREATE TABLE product (
  id SERIAL,
  "name" VARCHAR(255),
  slogan TEXT,
  "description" TEXT,
  category VARCHAR(50),
  default_price INTEGER,
  PRIMARY KEY (id)
);

-- ---
-- Table 'reviews'
--
-- ---

CREATE TABLE reviews (
  id SERIAL,
  product_id INTEGER NOT NULL,
  rating INTEGER NOT NULL,
  "date" BIGINT,
  summary TEXT,
  body TEXT,
  recommend BOOLEAN DEFAULT TRUE,
  reported BOOLEAN DEFAULT FALSE,
  reviewer_name VARCHAR(50),
  reviewer_email VARCHAR(50),
  response TEXT,
  helpfulness INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

-- ---
-- Table 'reviews_photo'
--
-- ---



CREATE TABLE reviews_photo (
  id SERIAL,
  review_id INTEGER,
  "url" TEXT,
  PRIMARY KEY (id)
);

-- ---
-- Table 'characterstic'
--
-- ---



CREATE TABLE characteristics (
  id SERIAL,
  product_id INTEGER,
  "name" VARCHAR(50),
  PRIMARY KEY (id)
);

-- ---
-- Table 'characteristic_reviews'
--
-- --

CREATE TABLE characteristic_reviews (
  id SERIAL,
  characteristic_id INTEGER,
  review_id INTEGER,
  "value" INTEGER,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE reviews ADD FOREIGN KEY (product_id) REFERENCES product (id);
ALTER TABLE reviews_photo ADD FOREIGN KEY (review_id) REFERENCES reviews (id);
ALTER TABLE reviews_photo ADD FOREIGN KEY (review_id) REFERENCES reviews (id);
ALTER TABLE characteristics ADD FOREIGN KEY (product_id) REFERENCES product (id);
ALTER TABLE characteristic_reviews ADD FOREIGN KEY (characteristic_id) REFERENCES characteristics (id);
ALTER TABLE characteristic_reviews ADD FOREIGN KEY (review_id) REFERENCES reviews (id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE product ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE reviews ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE reviews_photo ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE characteristics ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE characteristic_reviews ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO product (id, "name", slogan, "description", category, default_price) VALUES
-- (1,'Camo Onesie','Blend in to your crowd','The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.','Jackets',140);

-- INSERT INTO reviews (id, product_id, rating, "date", summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES
-- (1, 1, 5, 1596080481467, 'This product was great!', 'I really did or did not like this product based on whether it was sustainably sourced.  Then I found out that its made from nothing at all.', true, false, 'funtime', 'first.last@gmail.com', null, 8);

-- INSERT INTO reviews_photo (id, review_id, "url") VALUES
-- (1, 1, 'https://images.unsplash.com/photo-1560570803-7474c0f9af99?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=975&q=80');

-- INSERT INTO characteristics  (id, product_id, "name") VALUES
-- (1, 1, 'Fit');

-- INSERT INTO characteristic_reviews (id, characteristic_id, review_id, "value") VALUES
-- (1, 1, 1, 4);

-- ---
-- Loading Data
-- ---

COPY product(id, "name", slogan, "description", category, default_price)
FROM '/Users/lipinghuang/Desktop/sdc_files/product.csv'
DELIMITER ','
CSV HEADER;

COPY reviews(id, product_id, rating, "date", summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)
FROM '/Users/lipinghuang/Desktop/sdc_files/reviews.csv'
DELIMITER ','
CSV HEADER;

COPY reviews_photo(id, review_id, "url")
FROM '/Users/lipinghuang/Desktop/sdc_files/reviews_photos.csv'
DELIMITER ','
CSV HEADER;

COPY characteristics(id, product_id, "name")
FROM '/Users/lipinghuang/Desktop/sdc_files/characteristics.csv'
DELIMITER ','
CSV HEADER;

COPY characteristic_reviews(id, characteristic_id, review_id, "value")
FROM '/Users/lipinghuang/Desktop/sdc_files/characteristic_reviews.csv'
DELIMITER ','
CSV HEADER;

-- DROP MATERIALIZED  VIEW IF EXISTS reviews_meta_ratings;
-- CREATE MATERIALIZED VIEW reviews_meta_ratings AS
-- SELECT product_id, json_object_agg(rating, "count") AS ratings
-- FROM (SELECT product_id, rating, COUNT(id)
-- FROM reviews
-- GROUP BY product_id, rating) AS r
-- GROUP BY product_id;

-- DROP MATERIALIZED  VIEW IF EXISTS reviews_meta_recommended;
-- CREATE MATERIALIZED VIEW reviews_meta_recommended AS
-- SELECT product_id, json_object_agg(recommend, "count") AS recommended
-- FROM (SELECT product_id, recommend, COUNT(id)
-- FROM reviews
-- GROUP BY product_id, recommend) AS r
-- GROUP BY product_id;


-- DROP MATERIALIZED  VIEW IF EXISTS reviews_meta_characteristics;
-- CREATE MATERIALIZED VIEW reviews_meta_characteristics AS
-- SELECT product_id, json_object_agg("name", json_build_object('id', characteristic_id, 'value', "value")) AS characteristics
-- FROM (SELECT product_id, characteristic_id, "name", AVG("value") AS "value"
-- FROM characteristics
-- INNER JOIN characteristic_reviews
-- ON characteristic_reviews.characteristic_id = characteristics.id
-- GROUP BY product_id, characteristic_id, "name") AS a
-- GROUP BY product_id;


CREATE MATERIALIZED VIEW reviews_meta AS
SELECT t1.product_id, t1.ratings, t2.recommended, t3.characteristics
FROM (
    SELECT product_id, json_object_agg(rating, "count") AS ratings
    FROM (SELECT product_id, rating, COUNT(id)
    FROM reviews
    GROUP BY product_id, rating) AS r
    GROUP BY product_id
) AS t1
INNER JOIN (
  SELECT product_id, json_object_agg(recommend, "count") AS recommended
  FROM (SELECT product_id, recommend, COUNT(id)
  FROM reviews
  GROUP BY product_id, recommend) AS r
  GROUP BY product_id
) AS t2 ON t1.product_id = t2.product_id
INNER JOIN (
    SELECT product_id, json_object_agg("name", json_build_object('id', characteristic_id, 'value', "value")) AS characteristics
  FROM (SELECT product_id, characteristic_id, "name", AVG("value") AS "value"
  FROM characteristics
  INNER JOIN characteristic_reviews
  ON characteristic_reviews.characteristic_id = characteristics.id
  GROUP BY product_id, characteristic_id, "name") AS a
  GROUP BY product_id
) AS t3 ON t3.product_id = t1.product_id;


-- DROP VIEW IF EXISTS reviews_view;
-- CREATE VIEW reviews_view AS
-- SELECT product_id AS product, json_agg(json_build_object(
--   'review_id', id,
--   'rating', rating,
--   'summary', summary,
--   'recommend', recommend,
--   'response', response,
--   'body', body,
--   'date', "date",
--   'reviewer_name', reviewer_name,
--   'helpfulness', helpfulness,
--   'photos', COALESCE(photos, '[]'::json)))as results
-- FROM reviews
-- LEFT JOIN (SELECT review_id, json_agg(json_build_object('id', id, 'url', "url")) as photos
-- FROM reviews_photo
-- GROUP BY review_id) as t
-- ON reviews.id = t.review_id
-- GROUP BY product_id;

-- ---
-- AVOID UNIQ ID CONFLICT
-- ---

SELECT MAX(id) FROM reviews;
select nextval('reviews_id_seq');
BEGIN;
LOCK TABLE reviews IN EXCLUSIVE MODE;
SELECT setval('reviews_id_seq', COALESCE((SELECT MAX(id)+1 FROM reviews), 1), false);
COMMIT;

BEGIN;
LOCK TABLE reviews_photo IN EXCLUSIVE MODE;
SELECT setval('reviews_photo_id_seq', COALESCE((SELECT MAX(id)+1 FROM reviews_photo), 1), false);
COMMIT;

SELECT MAX(id) FROM characteristic_reviews;
select nextval('characteristic_reviews_id_seq');
BEGIN;
LOCK TABLE reviews IN EXCLUSIVE MODE;
SELECT setval('characteristic_reviews_id_seq', COALESCE((SELECT MAX(id)+1 FROM characteristic_reviews), 1), false);
COMMIT;

-- ---
-- CREATE FUNCTION
-- ---

-- CREATE OR REPLACE FUNCTION getReviewsByPage(
--  Product INTEGER,
--  PageNumber INTEGER DEFAULT 1,
--  PageSize INTEGER DEFAULT 5,
--  Sort VARCHAR DEFAULT 'helpfulness'
--  )
--  RETURNS SETOF public.reviews AS
--  $BODY$
--  DECLARE
--   PageOffset INTEGER :=0;
--  BEGIN

--   PageOffset := ((PageNumber-1) * PageSize);

--   RETURN QUERY
--    SELECT *
--    FROM public.reviews
--    WHERE product_id = Product AND reported = false
--    ORDER BY Sort DESC
--    LIMIT Pagesize
--    OFFSET PageOffset;
-- END;
-- $BODY$
-- LANGUAGE plpgsql;

-- ---
-- CREATE INDEX
-- ---

CREATE INDEX idx_product_id
ON reviews(product_id);

CREATE INDEX idx_product_id_characteristics
ON characteristics(product_id);

CREATE INDEX idx_id_characteristics
ON characteristic_reviews(characteristic_id);

CREATE INDEX idx_review_id_photo
ON reviews_photo(review_id);

CREATE INDEX idx_product_id_view
ON reviews_meta(product_id);