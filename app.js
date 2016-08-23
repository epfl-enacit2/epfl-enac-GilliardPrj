var configs = require('./configs')(require('path').join(__dirname, 'configs/configs.json'));
var sPort = require('serialport');
var store = require('epfl-enac-gilliarddb')(configs.db);
var acquSysId = require('./configs/generateAcquSysId')();
var acquisition = require('./acquisition')({ sPort: sPort, logging: configs.logging });

configs.acquisitionSys.boards.map(function (board) {
    acquisition.listen(board, function (acquisitionData) {
        acquisitionData.acquisitionSysId = acquSysId;
        store.repository.insertSensorValue({
                                                models:store.models,
                                                configs:configs,
                                                acquisitionData:acquisitionData,
                                                currentBoard:board
                                            });
    });
});

