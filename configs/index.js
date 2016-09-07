'use strict';
var fs = require('fs');
var uuid = require('uuid');

module.exports = function (configFilePath) {
    var jsonConfigs = JSON.parse(fs.readFileSync(configFilePath));

    verifyConfigFile(jsonConfigs, function () {
        //Test if an AcquSysId is defined yet, if it's not it will add it
        if (!jsonConfigs.acquisitionSys.hasOwnProperty('secret')) {
            jsonConfigs.acquisitionSys.secret = uuid.v1();
            fs.writeFile(configFilePath, JSON.stringify(jsonConfigs));
        }
    });
    return jsonConfigs;
}

/**
* Verify that all the needed configurations are writed (configured)
*
* @param {jsonConfigs} The configurations parsed in JSON
* @param {callback} Return jsonConfigs if it's OK
*/
function verifyConfigFile(jsonConfigs, callback) {
    var notNullPropertiesDB = ['hostname', 'username', 'password', 'name'];
    var notNullPropertiesBoards = ['port', 'rate'];
    var notNullPropertiesAcquSys = ['sciper'];

    testProperties(jsonConfigs.db, notNullPropertiesDB, 'db');

    jsonConfigs.acquisitionSys.boards.map(function (currentBoard) {
        testProperties(currentBoard, notNullPropertiesBoards, 'boards');
    });

    testProperties(jsonConfigs.acquisitionSys, notNullPropertiesAcquSys, 'acquisitionSys');

    callback();
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