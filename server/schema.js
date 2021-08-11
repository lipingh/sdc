const productSchema = new mongoose.Schema({
  id: 'number',
  name: 'string'
});

const characterticSchema = new mongoose.Schema({
  id: 'number',
  product_id: 'number',
  name: 'string'
});

const characterticReviewsSchema = new mongoose.Schema({
  id: 'number',
  characterstic_id: 'number',
  review_id: 'number',
  value: 'string'
});