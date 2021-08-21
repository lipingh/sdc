require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const controller = require('./controllers/queries');

const app = express();
const port = 3000;
const loaderio = 'loaderio-92d4962ab2aa913032dbbe0c0cc75f8d';

// app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(express.static('client/dist'));
app.get('/', (req, res) => {
  res.send('Hello world');
});
app.get(`/${loaderio}`, (req, res) => {
  res.send(loaderio);
});
app.get('/reviews/', controller.getReviews);
app.get('/reviews/meta', controller.getReviewsMeta);

app.put('/reviews/:id/helpful', controller.updateReviewHelpful);
app.put('/reviews/:id/report', controller.updateReviewReport);

app.post('/reviews', controller.postReview);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
