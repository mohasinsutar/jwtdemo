var express = require('express');
var router = express.Router();
var api = require('../routes/api');
var ToDo = require("../models/todo")
var verifytoken = require('../verifytoken');

router.get('/list', verifytoken, function(req, res, next) {
    ToDo.find({}, function(err, doc) {
        res.json(doc);
     });
});

router.post('/add', verifytoken , function(req,res,next){
    var todo = ToDo({
        name: req.body.name,
        description: req.body.description,
        status: req.body.status
    });
    todo.save(function(err){
        if(err){
            res.status(500).json({status: 'database error'});
        }
        else{
            res.json({status: 'task added successfully'});
        }
    });
});
module.exports = router;