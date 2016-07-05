var configs = require('./configs')(require('path').join(__dirname, 'configs/configs.json'));
var sPort = require('serialport');
var store = require('./DAL/store.js')(configs.store);
var acquisition = require('./acquisition')({store: store, sPort: sPort, configs: configs});

// configs.Modules.map(function (mod) {
//    acquisition.register(mod, function(acquisitionData){
//        store.Data.create(acquisitionData)
//          .then(funtion(){
//              console.log("data saved in db");
//          })
//          .catch(function(){ console.log("error"); });
//    }); 
// });

