var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');
const db = require('mongodb');
const { schema } = require('../models/cube');

router.get('/', async (req, res) => {
let searchText = req.query.search;
    let cube;
    try {
        const cube = await Cube.findOne({ name: searchText }).lean().exec(); 
        console.log('Found Cube :', cube);
        res.render('search', { title: 'Search Results', cube: cube, user: req.user });
    } catch(err) {
        res.status(404).json(err);
    }  
});
module.exports = router;