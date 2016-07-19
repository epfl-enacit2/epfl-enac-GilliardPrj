//https://github.com/hapijs/joi
var fs = require('fs');

module.exports = function (configFilePath) {
    var jsonConfigs = JSON.parse(fs.readFileSync(configFilePath, 'UTF-8'));
    var notNullPropertiesDB = ['hostname', 'username', 'password', 'name'];
    var notNullPropertiesBoards = ['port', 'rate', 'name'];

    notNullPropertiesDB.map(function(propName){

        if (!jsonConfigs.db.hasOwnProperty(propName)) {
            console.log("!!! Le fichier de config ne contient pas la propriété \""+propName+"\" dans db !!!");
            throw "Error1";
        } else {
            if(!jsonConfigs.db[propName]){
                console.log("!!! La propriété \""+propName+"\" est nulle dans db!!!");
                throw "Error2";
            }
        }        
    });

    jsonConfigs.acquisitionSys.boards.map(function (currentBoard) {
        notNullPropertiesBoards.map(function(propName){

        if (!currentBoard.hasOwnProperty(propName)) {
            console.log("!!! Le fichier de config ne contient pas la propriété \""+propName+"\" dans boards !!!");
            throw "Error1";
        } else {
            if(!currentBoard[propName]){
                console.log("!!! La propriété \""+propName+"\" est nulle dans boards !!!");
                throw "Error2";
            }
        }        
    });
    });
    if (!jsonConfigs.acquisitionSys.hasOwnProperty("sciper")) {
            console.log("!!! Le fichier de config ne contient pas la propriété sciper dans acquisitionSys !!!");
            throw "Error1";
        } else {
            if(!jsonConfigs.acquisitionSys["sciper"]){
                console.log("!!! La propriété sciper dans acquisitionSys est nulle !!!");
                throw "Error2";
            }
        }
    return jsonConfigs;
}