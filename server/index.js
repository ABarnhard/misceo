'use strict';

var Hapi     = require('hapi'),
    server   = new Hapi.Server(process.env.PORT),
    routes   = require('./routes/routes'),
    plugins  = require('./lib/plugins'),
    mongoose = require('mongoose').connect(process.env.DB);

server.route(routes);

mongoose.connection.once('open', function(){
    server.pack.register(plugins, function(){
        server.auth.strategy('simple', 'basic', {validateFunc: require('./lib/security')});
        server.start(function(){
            server.log('info', 'Server running at: ' + server.info.uri);
        });
    });
});

module.exports = server;
