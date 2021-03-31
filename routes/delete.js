var express = require('express');
var router = express.Router();
const Cube = require("../models/cube");

router.post('/:id', async (req, res) => {    
    let cube;
     try {
        cube = await Cube.findById(req.params.id);
        
        await cube.remove();
        res.redirect('/');
    }catch(err) {
        if(err) throw err;
            if (cube == null) {
                res.redirect('/');
            }else {
                res.redirect(`/details/${cube.id}`);
            }       
    }     
});

module.exports = router;