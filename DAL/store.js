module.exports = function (db){
    var SeqInit = require('sequelize');
    var sequelize = new SeqInit(db.name,db.username,db.password) //TODO: Passer config avec "_logging":null
    var Data = sequelize.define('t_sensors', {
                BID: SeqInit.STRING,
                SID: SeqInit.STRING,
                SVal: SeqInit.FLOAT
            });

    return {
        insert: function(data){

            Data.create({
                    BID: data.boardID,
                    SID: data.sensorID,
                    SVal: data.sensorVal
                });
            // sequelize.sync().then(function () {
            //     return Data.create({
            //         BID: data.boardID,
            //         SID: data.sensorID,
            //         SVal: data.sensorVal
            //     });
            // })
        }
    };

};



/*
var db = {
    Module: [],
    addModule: function (mod, sens, val) {

    }
};


exports.db = db;
*/