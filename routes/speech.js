var express = require('express');
var router = express.Router();
var bot_speech = require('../utilities/speech_table');
var bodyParser = require('body-parser');
var googleTTS = require('google-tts-api');
var download = require('download-file');
let middleware = require('../middleware');
const base_path = "/tmp/";
router.use(bodyParser.json());

router.post("/add/",middleware.checkToken, function(req, res) {
    bot_speech.add(req.body, function(oJson){
        res.send({
            status: JSON.stringify({
                success:true,
                response: 'success',
                message :"Speech added succefully"
            })
        });
        res.end();
    });
    
});

router.post("/update/",middleware.checkToken, function(req, res) {
    bot_speech.update(req, function(result){
        res.json({
            success:true,
            "response": "successfully updated"
        });
        res.end();
    });
});

router.post("/list/",middleware.checkToken, function(req, res) {
    bot_speech.list(req.body.uuid, function(result) {
        res.json({
            success:true,
            "response": "success",
            "data": result
        });
        res.end();
    });
});
//============ delete speech content ==================//
router.post("/delete/", middleware.checkToken, function(req, res) {
    bot_speech.remove(req["body"]["id"], function(result){
        console.log(result)
        res.json({
            success:true,
            "response": "Deleted succesfully"
        });
    });
});
//============ delete speech content ==================//


var getDownloadLink = function(tilte, content, callback){
    googleTTS(content, 'en', 1)   // speed normal = 1 (default), slow = 0.24
    .then(function (url) {
        callback(url)
    })
    .catch(function (err) {
        console.error(err.stack);
    });
}
/**
 * 
 * @param {*} url 
 */
var downloadMp3File = function(url,fileName, callback){
 
    var options = {
        directory:  base_path,
        filename: fileName + ".mp3"
    }
    download(url, options, function(err){
        if (err) throw err
        callback(base_path +  fileName + ".mp3")
    }) 
}

router.post("/convert", function(req, res) {
    getDownloadLink(req["body"]["title"],req["body"]["content"], function(cb){
        downloadMp3File(cb,req["body"]["title"], function(oFile){
            res.json({
                success : true,
                "response": "Downloaded succesfully",
                "url":cb,
                "file":oFile
            });
        });
    });

});
router.post("/download", function(req, res) {
    var mp3File =  req["body"]["file"]
})



module.exports = router;