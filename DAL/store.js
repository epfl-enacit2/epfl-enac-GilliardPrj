var SeqInit = require('sequelize');
var sequelize = new SeqInit('test_node', 'user', 'pass')

function Init(data) {

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

module.exports = Init;

/*
var db = {
    Module: [],
    addModule: function (mod, sens, val) {

    }
};


exports.db = db;
*/