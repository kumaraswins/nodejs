var express = require('express');
var router = express.Router();
var dialog_flow = require('../utilities/df');
var bodyParser = require('body-parser');
let middleware = require('../middleware');

router.use(bodyParser.json());

router.post("/add/", middleware.checkToken,  function(req, res) {
    dialog_flow.add(req.body, function(oJson){
        res.send({
            status: JSON.stringify({
                response: 'success',
                success : true,
                message :"Speech added succefully"
            })
        });
        res.end();
    });
    
});

router.post("/update/", middleware.checkToken,  function(req, res) {
    dialog_flow.update(req, function(result){
        res.json({
            success : true,
            "response": "successfully updated"
        });
        res.end();
    });
});

router.post("/list/", middleware.checkToken,  function(req, res) {
    dialog_flow.list(req.body.uuid, function(result) {
        res.json({
            success : true,
            "response": "success",
            "data": result
        });
        res.end();
    });
});
//============ delete speech content ==================//
router.post("/delete/", middleware.checkToken,  function(req, res) {
    dialog_flow.remove(req["body"]["id"], function(result){
        console.log(result)
        res.json({
            success : true,
            "response": "Deleted succesfully"
        });
    });
});
module.exports = router;