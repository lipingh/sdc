const express = require('express');
const cloudinary = require('cloudinary');
const formData = require('express-form-data');

const app = express();
const port = 3000;

app.use(express.json());

app.use(express.static('client/dist'));

cloudinary.config({
  cloud_name: 'dm7b2gbla',
  api_key: '678545256313262',
  api_secret: 'E3atfiIxH8hRa1YPeGFTuaT5qks',
});

app.use(formData.parse());
app.post('./image-upload', (req, res) => {
  const values = Object.values(req.files);
  const promises = values.map((image) => cloudinary.uploader.upload(image.path));

  Promise
    .all(promises)
    .then((results) => res.json(results));
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
