const router = require('express').Router();
const controller = require('./controllers/queries');

// Connect controller methods to their corresponding routes
router.get('/reviews/:product_id', controller.getReviewsByProductId);
router.get('/reviews/meta:product_id', controller.getReviewsMeta);

module.exports = router;
