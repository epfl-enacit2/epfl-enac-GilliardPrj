var SeqInit = require('sequelize');
var SensorValues = sequelize.define('SensorValues', {
               CreatedAt: {
                   type: SeqInit.DATE,
                   defaultValue: SeqInit.NOW,
                   allowNull: false,
                   primaryKey: true
               },
               Sensors_SID: {
                   type: SeqInit.STRING(45),
                   allowNull: false,
                   primaryKey: true,
                   references: {
                       model: Sensors,
                       key: 'SID'
                   }
               },
               Sensors_Boards_BID: {
                   type: SeqInit.STRING(20),
                   allowNull: false,
                   primaryKey: true,
                   references: {
                       model: Sensors,
                       key: 'Boards_BID'
                   }
               },
               Value: {
                   type: SeqInit.FLOAT,
                   defaultValue: SeqInit.NULL
               }
           }
           );