var express = require('express');
var router = express.Router();
var devices = require('../utilities/devices');
let jwt = require('jsonwebtoken');
let config = require('../config');
let middleware = require('../middleware');
var bodyParser = require('body-parser');
router.use(bodyParser.json());

//             Bot speech section                 //
//============ Add new device ====================//
router.post("/add/", middleware.checkToken , function(req, res) {
    devices.add(req.body.name, req.body.password, req.body.uuid, function(result){
        res.send({
            status: JSON.stringify({
                success : true,
                response: 'success',
            })
        });
    });
});
//============ get all devices ====================//
router.get(  "/list/", middleware.checkToken , function(req, res) {
    devices.list( function(result) {
        res.json({
            success : true,
            "response": "success",
            "data": result
        });
        res.end();
    });
});
//============ update the bot details ====================//
router.post("/update/", middleware.checkToken , function(req, res) {
    devices.update(req, function(result) {
        res.json({
            success : true,
            "response": "Bot updated succesfully"
        });
        res.end();
    });
});

//============ login to  the bot ====================//
router.post("/login/", function(req, res) {
    var message ="error";
    var token = ""
    devices.login( req, function(data, result){
        if(result == "success"){
             token = jwt.sign({name: req.body.name},
                config.secret, { expiresIn: '24h' });
            message = "success";
            res.send({
                data: {
                    token : token,
                    response: message,
                    data: data,
                    success : true
                }
            });
        } else if (result == "error"){
            res.send({
                success : false,
                message: 'Incorrect username or password'
              });
        }
    })
});

router.post("/delete/", middleware.checkToken , function(req, res) {
    devices.remove(req.body, function(result) {
        res.json({
            success : true,
            "response": "Bot updated succesfully"
        });
        res.end();
    });
});
module.exports = router;
