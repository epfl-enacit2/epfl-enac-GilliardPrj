//https://github.com/hapijs/joi
'use strict';
var fs = require('fs');
var uuid = require('uuid');

module.exports = function (configFilePath) {
    var jsonConfigs = JSON.parse(fs.readFileSync(configFilePath, 'UTF-8'));
    var notNullPropertiesDB = ['hostname', 'username', 'password', 'name'];
    var notNullPropertiesBoards = ['port', 'rate', 'name'];
    var notNullPropertiesAcquSys = ['sciper'];

    verifyConfigFile(function () {
        if (!jsonConfigs.acquisitionSys.hasOwnProperty('secret')) {
            jsonConfigs.acquisitionSys.secret = uuid.v1();
            fs.writeFile(configFilePath, JSON.stringify(jsonConfigs));
        }
    });

    function verifyConfigFile(callback) {
        testProperties(jsonConfigs.db, notNullPropertiesDB, 'db');

        jsonConfigs.acquisitionSys.boards.map(function (currentBoard) {
            testProperties(currentBoard, notNullPropertiesBoards, 'boards');
        });

        testProperties(jsonConfigs.acquisitionSys, notNullPropertiesAcquSys, 'acquisitionSys');

        callback();
    }
    return jsonConfigs;
}

function testProperties(jsonObject, notNullProperties, currentTesting) {
    notNullProperties.map(function (propName) {
        if (!jsonObject.hasOwnProperty(propName)) {
            console.log("!!! Le fichier de config ne contient pas la propriété \"" + propName + "\" dans " + currentTesting + " !!!");
            throw "Error";
        } else {
            if (!jsonObject[propName]) {
                console.log("!!! La propriété \"" + propName + "\" est nulle dans " + currentTesting + " !!!");
                throw "Error";
            }
        }
    });
}