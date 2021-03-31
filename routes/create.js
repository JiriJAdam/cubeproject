var express = require('express');
var router = express.Router();
const Cube = require("../models/cube");
const Accessory = require("../models/accessory");
const {handlebars} = require('hbs');


router.get('/', function(req, res, next) {
    res.render('create', { title: 'Create a Cube' , user : req.user });
});

router.post('/', function(req, res, next) {

    let data = req.body;
    let cube = new Cube({
        name: data.name, 
        description: data.description, 
        imageUrl: data.imageUrl, 
        difficulty: data.difficultyLevel,
        accessories: []
    });
    cube.save()
    .then((response) => {
        console.log(response);
        res.redirect('/');
    });
});

router.get('/accessory', function(req, res, next) {
    res.render('createAccessory', { title: 'Create Cube Accessory' , user: req.user});
});

router.post('/accessory', function(req, res, next) {
    console.log('create accessory post');
    console.log('incoming form submission', req.body);
    let data = req.body;
    const accessory = new Accessory({
        name: data.name,
        imageUrl: data.imageUrl,
        description: data.description,        
        cubes: []
    });
    
    accessory.save()
    .then((response) => {
        console.log(response);
        res.redirect('/');
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router;