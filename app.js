var configs = require('./configs')(require('path').join(__dirname, 'configs/configs.json'));
var sPort = require('serialport');
var store = require('./DAL/store.js')(configs.db);
var acquisition = require('./acquisition')({sPort: sPort,store:store,configs:configs});

configs.acquisitionSys.boards.map(function (board) {
    acquisition.register(board, function (acquisitionData) {
        //store.Data.create(acquisitionData)
            //.then(function(){

            //    function logElements(elements) {
            //    elements.forEach(function (element) {
            //        logIfDebug(element);
            //    });
            //}

            //logElements(acquisitionData);
            //})
            //.catch(function () { console.log("error"); });
    });
});

