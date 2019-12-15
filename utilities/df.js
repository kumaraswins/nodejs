var table  = require('./db');

module.exports = {
   
    add: function(oDf, responseCallback){
        table.Table1.create( { title: oDf["title"], 
            content: oDf["content"], 
            uuid: oDf["uuid"] })
            .then(() => {
                responseCallback(("success"))
          }); 
    },
    update:  function(oDf, responseCallback){
        table.Table1.update( { title: oDf["body"]["title"], 
            content: oDf["body"]["content"], 
            uuid: oDf["body"]["uuid"] }, 
            { where: {id:  oDf["body"]["id"]} }
          ).then(() => {
            responseCallback(("success"))
          });        
        
    },
    list:  function(id, responseCallback){
        table.Table1.findAll({where: {uuid: id},order: [
            ['title', 'ASC'],],
          }).then((data) => {
            responseCallback(data)
          });
    },
    remove : function(id, responseCallback){
        table.Table1.destroy({
            where: { id: id }
        }).then(() => {
            //res.status(200).send('deleted successfully a customer with id = ' + id);
            responseCallback('deleted successfully a customer with id = ' + id)
        });
    } 
}