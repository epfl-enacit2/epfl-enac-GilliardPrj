'use strict';

var fs = require("fs");
var util = require('util');
var sPort = require('serialport');
var SerialPort = sPort.SerialPort;

module.exports = function (logging) {
    return {
        listen: function (mod, callback) {
            var ToSave = [];
            var port = new SerialPort(mod.port, {
                baudrate: mod.rate,
                parser: sPort.parsers.readline('\n')
            });

            port.on('open', function () {
                logIfDebug(`open ${mod.name}`);
                port.on('data', function (data) {
                    logIfDebug(`data start on ${mod.name}`);
                    formatData(data, mod, callback);
                    logIfDebug("data end on " + mod.name + "\r");
                });
            });
        }
    };

    //TODO: Replace by regex >  str.replace(/,(\s+)?$/, '');   
    function removeEnter(data) {
        if (data.includes('\r')) {
            return data.slice(0,-1);
        }
        else {
            return data;
        }
    }

    function formatData(data, mod, callback) {
        if (data.charAt(0) == '>') {
            //TODO: supprimer une iteration superflue
            parseData(data, function (cleanData) {
                callback(cleanData);
            });
        }
        else {
            //Si le caractère est / c'est un commentaire --> dans console
            if (data.charAt(0) == '/') {
                logIfDebug('Commentaires: ' + data + ' on ' + mod.name);
            }
            else {
                logIfDebug('Error :' + data);
            }
        }
    }

    function logIfDebug(msg) {
        switch (logging) {
            case "console":
                console.log(msg);
                break;
            case "fichier":
                fs.appendFile("GilliardPrj.log", '\n' + util.inspect(msg));
                break;
            case "":
                break;
            default:

        }
    }

    function parseData(data, next) {
        var dataSplitted = data.split(',');
        var ModuleID = dataSplitted[0].substring(1);
        //console.logIfDebug('BoardId : ' + ModuleID);
        for (var i in dataSplitted) {

            if (i != 0) {
                var dataReSplitted = dataSplitted[i].split('=');
                dataReSplitted[1] = removeEnter(dataReSplitted[1]);

                //TODO: Voir pour supprimer le doublon !
                if (dataReSplitted[0].charAt(0) != "X" | "x") {
                    var cleanData = {
                        boardID: dataSplitted[0].substring(1),
                        sensorID: dataReSplitted[0],
                        sensorVal: dataReSplitted[1]
                    }
                    logIfDebug(cleanData);
                }
                else {
                    logIfDebug({
                        boardID: dataSplitted[0].substring(1),
                        sensorID: dataReSplitted[0],
                        sensorVal: dataReSplitted[1]
                    });
                }

            }
            //Voir si faire un test de "split(*)" sur dataReSplitted[1] avec la dernière incrémentation (Vérifier qu'il y aie pas de checksum *)
        }
        next(cleanData, null);
    };
};