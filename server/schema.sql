DROP DATABASE IF EXISTS Retail

CREATE DATABASE Retail


-- ---
-- Table 'product'
--
-- ---

DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'reviews'
--
-- ---

DROP TABLE IF EXISTS `reviews`;

CREATE TABLE `reviews` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `product_id` INTEGER NULL DEFAULT NULL,
  `rating` INTEGER NULL DEFAULT NULL,
  `date` INTEGER NULL DEFAULT NULL,
  `summary` INTEGER NULL DEFAULT NULL,
  `body` TEXT NULL DEFAULT NULL,
  `recommend` BOOLEAN DEFAULT TRUE,
  `reported` BOOLEAN DEFAULT FALSE,
  `reviewer_name` VARCHAR NULL DEFAULT NULL,
  `reviewer_email` VARCHAR NULL DEFAULT NULL,
  `response` TEXT NULL DEFAULT NULL,
  `helpfulness` INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'reviews_photo'
--
-- ---

DROP TABLE IF EXISTS `reviews_photo`;

CREATE TABLE `reviews_photo` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `review_id` INTEGER NULL DEFAULT NULL,
  `url` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'characterstic'
--
-- ---

DROP TABLE IF EXISTS `characterstic`;

CREATE TABLE `characterstic` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `product_id` INTEGER NULL DEFAULT NULL,
  `name` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'characteristic_reviews'
--
-- ---

DROP TABLE IF EXISTS `characteristic_reviews`;

CREATE TABLE `characteristic_reviews` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `characteristic_id` INTEGER NULL DEFAULT NULL,
  `review_id` INTEGER NULL DEFAULT NULL,
  `value` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `reviews` ADD FOREIGN KEY (product_id) REFERENCES `product` (`id`);
ALTER TABLE `reviews_photo` ADD FOREIGN KEY (review_id) REFERENCES `reviews` (`id`);
ALTER TABLE `reviews_photo` ADD FOREIGN KEY (review_id) REFERENCES `reviews` (`id`);
ALTER TABLE `characterstic` ADD FOREIGN KEY (product_id) REFERENCES `product` (`id`);
ALTER TABLE `characteristic_reviews` ADD FOREIGN KEY (characteristic_id) REFERENCES `characterstic` (`id`);
ALTER TABLE `characteristic_reviews` ADD FOREIGN KEY (review_id) REFERENCES `reviews` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `product` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `reviews` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `reviews_photo` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `characterstic` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `characteristic_reviews` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `product` (`id`) VALUES
-- ('');
-- INSERT INTO `reviews` (`id`,`product_id`,`rating`,`date`,`summary`,`body`,`recommend`,`reported`,`reviewer_name`,`reviewer_email`,`response`,`helpfulness`) VALUES
-- ('','','','','','','','','','','','');
-- INSERT INTO `reviews_photo` (`id`,`review_id`,`url`) VALUES
-- ('','','');
-- INSERT INTO `characterstic` (`id`,`product_id`,`name`) VALUES
-- ('','','');
-- INSERT INTO `characteristic_reviews` (`id`,`characteristic_id`,`review_id`,`value`) VALUES
-- ('','','','');