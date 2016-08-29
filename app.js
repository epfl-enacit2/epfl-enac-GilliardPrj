'use strict';
var configs = require('./configs')(require('path').join(__dirname, 'configs/configs.json'));
var store = require('epfl-enac-gilliarddb')(configs.db);
var acquisition = require('./acquisition')(configs.logging);
var fs = require('fs');

configs.acquisitionSys.boards.map(function (board) {
    acquisition.listen(board, function (acquisitionData) {
        acquisitionData.acquisitionSysId = configs.acquisitionSys.secret;
        try {
            store.repository.insertSensorValue({
            models: store.models,
            configs: configs,
            acquisitionData: acquisitionData,
            currentBoard: board
        });
        } catch (error) {
            fs.appendFile('./logs/errors.txt',error);//loguer fichier ou console ? --> séparer du reste (avec log des entrées failed) chemin dans configs ?
        }
    });
});

