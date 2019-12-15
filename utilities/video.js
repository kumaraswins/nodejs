
var fs = require('fs')
var youtubedl = require('youtube-dl')

module.exports = {

    downloadVideo : function(url, name, callback){
        const video = youtubedl(url,['--format=18'],{ cwd: __dirname })
        video.on('info', function(info) {
            video.pipe(fs.createWriteStream(info._filename))
            callback("download Completed");
        });
    }
}