var express = require('express');
var router = express.Router();
var request = require('request');
var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {

  async.series(
    [
      function (callback) {
        // twitter API
        var url = 'http://urls.api.twitter.com/1/urls/count.json?url=https://www.google.com/';
        request(url, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(JSON.parse(body));
          }
          callback();
        });
      },
      function (callback) {
        // Facebook API
        var url = 'http://graph.facebook.com/?id=https://www.google.com/';
        request(url, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            console.log(JSON.parse(body));
          }
          callback();
        });
      }
    ],
    function (err, results) {
      if (err) throw err;
      res.render('index', { title: 'Express' });
    });
});

module.exports = router;
