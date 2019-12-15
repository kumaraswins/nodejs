var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
const port = 3000;
var basket = {};
var morgan = require('morgan')
var helpers = require('./utilities/helper');
var botRouter = require('./routes/bot');
var speechRouter = require('./routes/speech');
var dfRouter = require('./routes/df');
var navRouter = require('./routes/navigation');
var appRoute = require('./routes/main.js');
const helmet = require('helmet');
app.use(helmet.frameguard({ action: 'sameorigin' }));
app.use(helmet.noCache());

// Instantiating the app 
app.use(morgan('tiny'))
app.use('/bot', botRouter);
app.use('/speech', speechRouter);
app.use('/df', dfRouter);
app.use('/nav', navRouter);
app.use('/', appRoute);


// ==================================================================================== //
//                                   Socket connection                                  //
io.on('connection', function(socket) {
   
    socket.on('message', function(msg) {
        var oSocket = helpers.getSocketId(msg,basket);
        io.to(oSocket["socketId"]).emit('message', oSocket['message']);
    });
    /**
     * Registers the ios device with the UUID from the settings server
     * and creates the basket for one to one communication
     */
    socket.on('register', function(message) {
        basket[message] = socket.id;
    });
    /**
     * Deregistering the device
     */
    socket.on('deregister', function(msg) {
        for (var k in basket) {
            if (socket.id == basket[k]) {
                console.log("Deregistered the device " + k);
                break;
            }
        }
    });
    /**
     * Dummy function
     */
    socket.on('register_ios', function(socket) {
        console.log(socket)
    });
    
    
});
//                                   Socket connection                                  //
// ==================================================================================== //
module.exports = app;

http.listen(port, function() {
    console.log('listening on *:' + port);
});
