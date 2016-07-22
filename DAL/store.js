module.exports = function (db) {
    var SeqInit = require('sequelize');
    var sequelize = new SeqInit(db.name, db.username, db.password, {
        host: db.hostname,
        dialect: 'mysql',
        //logging:false,
        define: {
            timestamps: false,
            freezeTableName: true
        }
    });//TODO: Passer config avec "_logging":null, séparer les modèles et il initialisera auto, créer user qui a uniquement insert

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
                  type: SeqInit.STRING(45),
                  allowNull: false,
                  primaryKey: true,
                  references: {
                      model: Sensors,
                      key: 'Boards_BID'
                  }
              },
              Sensors_Boards_AcquisitionSys_IdAcquisitionSys: {
                  type: SeqInit.INTEGER,
                  allowNull: false,
                  primaryKey: true,
                  references: {
                      model: Sensors,
                      key: 'Boards_AcquisitionSys_IdAcquisitionSys'
                  }
              },
               Sensors_Boards_AcquisitionSys_Sciper: {
                  type: SeqInit.INTEGER,
                  allowNull: false,
                  primaryKey: true,
                  references: {
                      model: Sensors,
                      key: 'Boards_AcquisitionSys_Sciper'
                  }
              },
               
               Value: {
                   type: SeqInit.FLOAT,
                   defaultValue: SeqInit.NULL
               }
           }
           );
          var Sensors = sequelize.define('Sensors', {
              SID: {
                  type: SeqInit.STRING(45),
                  allowNull: false,
                  primaryKey: true
              },
              Boards_BID: {
                  type: SeqInit.STRING(45),
                  allowNull: false,
                  primaryKey: true,
                  references: {
                      model: Boards,
                      key: 'BID'
                  }
              },
              Boards_AcquisitionSys_IdAcquisitionSys: {
                  type: SeqInit.INTEGER,
                  allowNull: false,
                  primaryKey: true,
                  references: {
                      model: Boards,
                      key: 'AcquisitionSys_IdAcquisitionSys'
                  }
              },
               Boards_AcquisitionSys_Sciper: {
                  type: SeqInit.INTEGER,
                  allowNull: false,
                  primaryKey: true,
                  references: {
                      model: Boards,
                      key: 'AcquisitionSys_Sciper'
                  }
              },
              Type: {
                  type: SeqInit.STRING(45)
              },
              SensorModel: {
                  type: SeqInit.STRING(100)
              },
              BoardPins: {
                  type: SeqInit.STRING(100)
              },
              ConnectedAt: {
                  type: SeqInit.DATE,
                  defaultValue: SeqInit.NOW,
                  allowNull: false,
              },
              Unit: {
                  type: SeqInit.STRING(100)
              }
          }
          );
    var Boards = sequelize.define('Boards', {
        BID: {
            type: SeqInit.STRING(20),
            allowNull: false,
            primaryKey: true
        },
        AcquisitionSys_IdAcquisitionSys: {
            type: SeqInit.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: AcquisitionSys,
                key: 'IdAcquisitionSys'
            }
        },
        AcquisitionSys_Sciper: {
            type: SeqInit.INTEGER,
            allowNull: false,
            primaryKey: true,
            references: {
                model: AcquisitionSys,
                key: 'Sciper'
            }
        },
        Name: {
            type: SeqInit.STRING(45)
        },
        BoardsModel: {
            type: SeqInit.STRING(45)
        },
        Rate: {
            type: SeqInit.INTEGER
        },
        ConnexionPort: {
            type: SeqInit.STRING(20)
        },
        ConnectedAt: {
            type: SeqInit.DATE,
            defaultValue: SeqInit.NOW,
            allowNull: false,
        }
    }
    );

    var AcquisitionSys = sequelize.define('AcquisitionSys', {
        IdAcquisitionSys: {
            type: SeqInit.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        Sciper: {
            type: SeqInit.STRING(7),
            allowNull: false,
            primaryKey: true
        },
        Computername: {
            type: SeqInit.STRING(45),
            allowNull: false
        },
        MacAdress: {
            type: SeqInit.STRING(45)
        },
        IP: {
            type: SeqInit.STRING(15)
        },
        Responsible: {
            type: SeqInit.STRING(145)
        },

        AppVersion: {
            type: SeqInit.STRING(10)
        },
        CreatedAt: {
            type: SeqInit.DATE,
            defaultValue: SeqInit.NOW,
            allowNull: false,
        },
        StartedAt: {
            type: SeqInit.DATE,
            defaultValue: SeqInit.NOW,
            allowNull: false,
        }
    }
    );

    return {
        AcquisitionSys: AcquisitionSys,
        Boards: Boards,
        Sensors:Sensors,
        SensorValues:SensorValues
        /*insert: function (data) {

            SensorValues.create({
                Value: data.sensorVal
            });
         sequelize.sync().then(function () {
             return Data.create({
                 BID: data.boardID,
                 SID: data.sensorID,
                 SVal: data.sensorVal
             });
         })*/
    }
};