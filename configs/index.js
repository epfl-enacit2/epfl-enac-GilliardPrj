//https://github.com/hapijs/joi
var fs = require('fs');

module.exports = function (configFilePath) {
    var jsonConfigs = JSON.parse(fs.readFileSync(configFilePath, 'UTF-8'));
    var notNullPropertiesDB = ['hostname', 'username', 'password', 'name'];
    var notNullPropertiesBoards = ['port', 'rate', 'name'];
    var notNullPropertiesAcquSys = ['sciper'];

    verifyConfigFile(function(){

        return jsonConfigs;
    });
    
    function verifyConfigFile(callback){
        testProperties(jsonConfigs.db, notNullPropertiesDB, 'db');

        jsonConfigs.acquisitionSys.boards.map(function (currentBoard) {
            testProperties(currentBoard, notNullPropertiesBoards, 'boards');
        });

        testProperties(jsonConfigs.acquisitionSys, notNullPropertiesAcquSys, 'acquisitionSys');

        callback();
    }  
}

function testProperties(jsonObject, notNullProperties, currentTesting) {
        notNullList.map(function (propName) {
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