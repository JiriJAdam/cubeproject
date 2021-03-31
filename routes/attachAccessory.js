var express = require('express');
var router = express.Router();
const Cube = require("../models/cube");
const Accessory = require("../models/accessory");

router.get('/:id', function(req, res, next) {
    let id = req.params.id;
    console.log('the id is', id);
    Cube.findOne({_id: id}).populate('accessories')
      .then((results) => {

        let idArr = results.accessories.map(a => {return a._id;});
        Accessory.find()
        .then((foundAccessories) => {
            let dropdownAccessories = foundAccessories
            .filter(acc => !idArr.includes(acc._id));
            res.render('AttachAccessory', { title: 'Attach Accessory', cube: results, dropdownAccessories: dropdownAccessories , user: req.user});
        });        
      }); 
});

router.post('/:id', function(req, res, next) {
    let selAccId = req.body.accessory;
    let cubeId = req.params.id;
    Cube.findOneAndUpdate(
        {_id: cubeId},
        { $push: {"accessories": selAccId}},
        {upsert: true},
        function(err){
           if(err) throw(err);
        }
    );
    Accessory.findOneAndUpdate(
        {_id: selAccId},
        { $push: {"cubes": cubeId}},
        {upsert: true},
        function(err){
           if(err) throw(err);
        }
    );
    res.redirect(`/details/${cubeId}`);
});    

module.exports = router;