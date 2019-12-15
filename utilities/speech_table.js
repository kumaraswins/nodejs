var table  = require('./db');

module.exports = {
   
    add: function(oSpeech, responseCallback){
        table.Speech.create( { title: oSpeech["title"], 
            content: oSpeech["content"], 
            uuid: oSpeech["uuid"] })
            .then(() => {
                responseCallback(("success"))
          }); 
    },
    update:  function(oSpeech, responseCallback){
        table.Speech.update( { title: oSpeech["body"]["title"], 
            content: oSpeech["body"]["content"], 
            uuid: oSpeech["body"]["uuid"] }, 
            { where: {id:  oSpeech["body"]["id"]} }
          ).then(() => {
            responseCallback(("success"))
          });        
        
    },
    list:  function(id, responseCallback){
        table.Speech.findAll({where: {uuid: id},order: [
            ['title', 'ASC'],],
          }).then((data) => {
            responseCallback(data)
          });
    },
    remove : function(id, responseCallback){
        table.Speech.destroy({
            where: { id: id }
        }).then(() => {
            //res.status(200).send('deleted successfully a customer with id = ' + id);
            responseCallback('deleted successfully a customer with id = ' + id)
        });
    } 
}