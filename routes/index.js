var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  var url = 'http://urls.api.twitter.com/1/urls/count.json?url=https://www.google.com/';
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(JSON.parse(body));
    }
    res.render('index', { title: 'Express' });
  });
});

module.exports = router;
