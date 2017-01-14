var express = require('express');
var router = express.Router();
var model = require('../model/images');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Multimedia Search and Retrieval Practical Exercise' });
});

router.get('/images/:queryId', function(req, res, next) {
  model.getImagesForQueryId(req.params.queryId, function (err, result) {
      if (err) {
          res.status(err.status || 500).send(err.message || 'Internal Server Error');
      } else {
          res.status(200).send(result);
      }
  });
});

router.get('/locations', function(req, res, next) {
    model.getAllLocations(function (err, locations) {
        if (err) {
            res.status(err.status || 500).send(err.message || 'Internal Server Error');
        } else {
            res.send(locations);
        }
    });
});

module.exports = router;
