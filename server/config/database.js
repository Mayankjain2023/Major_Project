
var config={
    port:8080,
    site:'http://localhost/projectManagement/#/',


    mongo:
    {
        hostname:'localhost',
        port:'27017',
        db:'Major_Project'
    }
};

config.mongo.url='mongodb://'+config.mongo.hostname+':'+config.mongo.port+'/'+config.mongo.db;
module.exports=config;

//aws access credentials

// AKIATMQXENF7HLZQOPBB
// vBkmD0N3IgxWRY+gMoYjXFezR2KfbIAjU67Or12M