const API_KEY = 'YOUR_API_KEY';
const CAMPUS_CODE = 'hr-sjo';

const options = {
  url: `https://app-hrsei-api.herokuapp.com/api/fec2/${CAMPUS_CODE}/`,
  headers: {
    Authorization: API_KEY,
  },
};

// an example to use options
// const axios = require('axios');

// axios({
//   url: options.url + 'products',
//   method: 'get',
//   headers: options.headers,
// })
//   .then(res => console.log(res.data))
//   .catch(err => console.log(err));

module.exports = options;
