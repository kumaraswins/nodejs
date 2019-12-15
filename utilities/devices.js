/**
 * Devices api
 */
var table = require('./db');

module.exports = {
    //login devices
    login : function( req, responseCallback){
  
        table.Device.find({
            where: {
                name: req.body.name, password:  req.body.password
            }
            }).then(function(device) {
            if (!device) 
                responseCallback("","error");
            else
                responseCallback(device, "success");
        });
    },

    add:  function( name, password, uuid, responseCallback){
        table.Device.create( { name: name, 
            password: password, 
            uuid: uuid })
            .then((res) => {
                responseCallback("success");
          }); 
          
    },

    list:  function(responseCallback){
        table.Device.findAll().then((data) => {
            responseCallback(data)
          });
    },
 
    update:  function(oDevice, responseCallback){
        table.Device.update( { name: oDevice["body"]["name"], 
            password: oDevice["body"]["password"], 
            uuid: oDevice["body"]["uuid"] }, 
            { where: {id:  oDevice["body"]["id"]} }
          ).then(() => {
            responseCallback(("success"))
          });        
    },
    remove : function(req, responseCallback){
        table.Device.destroy({
            where: { id: req.id }
        }).then(() => {
            responseCallback('deleted successfully a customer  ');
        });
    } 
}