var configs = require('./configs')(require('path').join(__dirname, 'configs/configs.json'));
var sPort = require('serialport');
var SeqInit = require('sequelize');
var store = require('epfl-enac-gilliarddb')(configs.db);
var acquisition = require('./acquisition')({ sPort: sPort, store: store, configs: configs });

configs.acquisitionSys.boards.map(function (board) {
    
    acquisition.register(board, function (acquisitionData) {
        acquisitionData.acquisitionSysId = acquSysId;
        //Si j'arrive à avoir les données (element) ici c'est tout pour Insert (on peut se servir du map de board sinon il faut utiliser fichier config)
        // store.repository.insertSensorValue({
        //     models:store.models,
        //     configs:configs,
        //     acquisitionData:acquisitionData,
        //     currentBoard:board
        // })
    });
});

