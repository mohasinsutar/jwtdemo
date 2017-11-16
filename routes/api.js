var express = require('express');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var User = require("../models/user.js")
var router = express.Router();

// router.post('/signup', function (req, res, next) {
//     var newUser = User({
//         username: req.body.username,
//         password: bcrypt.hashSync(req.body.password, 10),
//         email: req.body.email
//     });
//     newUser.save(function (err) {
//         if (err) {
//             res.status(500).json({ message: 'database error' });
//         }
//         else {
//             res.json({ message: 'user registered successfully' });
//         }
//     });
// })
router.post('/signup', function (req, res, next) {
    var newUser = User({
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 10),
        email: req.body.email
    });
    User.findOne({
        username: req.body.username
    },function(err,user){
        if(err){
            res.status(500).json({ message: 'database error' });
        }
        if(user){
            res.status(500).json({ message: 'user already exists in database' });
        }
        else{
            newUser.save(function (err) {
                if (err) {
                    res.status(500).json({ message: 'database error' });
                }
                else {
                    res.json({ message: 'user registered successfully' });
                }
            });
        }
    });
});

router.post('/login', function (req, res, next) {
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err){
            res.status(500).json({ message: 'database error' });
        }
        if (!user) {
            res.status(401).json({ status: 'error', message: 'Authentication failed. User not found.' });
        } else if (user) {
            if (!user.comparePassword(req.body.password)) {
                res.status(401).json({ status:'error', message: 'Authentication failed. Wrong password.' });
            } else {
                return res.json(
                    { 
                    status: 'success', 
                    token: jwt.sign({ username: user.username,}, jwtkey) 
                    }
                );
            }
        }
    });
});

module.exports = router;
