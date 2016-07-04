var SeqInit = require('sequelize');
var sequelize = new SeqInit('test_node', 'user', 'pass')


exports.caca = function (data){

var Data = sequelize.define('T_Data', {
        BID: SeqInit.INTEGER,
        SID: SeqInit.STRING,
        SVal: SeqInit.FLOAT
    });
    

    sequelize.sync().then(function () {
        return Data.create({
            BID: data.boardID,
            SID: data.sensorID,
            SVal: data.sensorVal
        });
    })
};



/*
var db = {
    Module: [],
    addModule: function (mod, sens, val) {

    }
};


exports.db = db;
*/