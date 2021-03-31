var express = require('express');
const passport = require('passport');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/', passport.authenticate('local', {failureRedirect: '/login' }), function(req, res) {
    
    res.redirect('/');
});

module.exports = router;