var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var video = require('../utilities/video');

router.use(bodyParser.json());

router.post("/convert", function(req, res) {
    var url = req["body"]["url"]
    var name = req["body"]["name"]
    video.downloadVideo(url,name, function(data){
        console.log(data);
        res.json({
            success : true,
            "response": data,
            "url":url,
            "name":name
        });
    });
});

module.exports = router;