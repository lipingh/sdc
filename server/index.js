require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');

const controller = require('./controllers/queries');

const app = express();
const port = 3000;

// app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(express.static('client/dist'));
app.get('/loaderio-e0d9e09648c9188939e93c8ebc615540',(req, res)=>{
	res.send('loaderio-e0d9e09648c9188939e93c8ebc615540');
})
app.get('/reviews/', controller.getReviews);
app.get('/reviews/meta', controller.getReviewsMeta);

app.put('/reviews/:id/helpful', controller.updateReviewHelpful);
app.put('/reviews/:id/report', controller.updateReviewReport);

app.post('/reviews', controller.postReview);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
