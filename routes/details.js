var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');

router.get('/:id', function(req, res, next) {
  let id = req.params.id;
  Cube.findOne({_id: id}).populate('accessories')
    .then((results) => {
      let accessories = results.accessories;
      res.render('details', { title: 'These are the details', cube: results, accessories: accessories , user: req.user});
    }); 
});

module.exports = router;