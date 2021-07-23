// Put your API key goes here!
// Make your own copy and name it to config.js
var API_KEY = 'YOUR_API_KEY_HERE';


// Send a GET request with the authorization header set to
// the string 'my secret token'
const res = await axios.get('https://httpbin.org/get', {
  headers: {
    'Authorization': API_KEY
  }
});