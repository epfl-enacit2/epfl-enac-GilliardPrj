'use strict';

var fs = require("fs");
var util = require('util');
var sPort = require('serialport');
var serialPort = sPort.SerialPort;

module.exports = function (logging) {

    return {

        /**
        * A function who open and listen to the ports specified in the configs file
        *
        * @param {mod} Module who's sending data
        * @param {callback} A callback who's sending back "cleanData". CleanData is an element with a BoardID,sensorID and sensorVal
        */
        listen: function (mod, callback) {
            var port = new serialPort(mod.port, {
                baudrate: mod.rate,
                parser: sPort.parsers.readline('\n')
            });

            port.on('open', function () {
                logIfDebug(`open ${mod.name}`);
                port.on('data', function (data) {
                    logIfDebug(`data start on ${mod.name}`);
                    formatData(data, mod, function (cleanData) {
                        logIfDebug(cleanData);
                        //This Callback return the data to save in DB
                        callback(cleanData);
                    });
                    logIfDebug("data end on " + mod.name + "\r");
                });
            });
        }
    };

    /**
     * Determine if data is commentary, error or data to parse and save.
     *
     * @param {data} Data from acquisition
     * @param {mod} Module who's sending data
     * @param {callback} A callback who's sending back "cleanData". CleanData is an element with a BoardID,sensorID and sensorVal
     */
    function formatData(data, mod, callback) {
        if (data.charAt(0) == '>') {
            parseData(data, function (cleanData) {
                callback(cleanData);
            });
        }
        else {
            //If first char is / it's a remark --> in Log
            if (data.charAt(0) == '/') {
                logIfDebug('Commentaires: ' + data + ' on ' + mod.name);
            }
            else {
                logIfDebug('Error :' + data);
            }
        }
    }

    /**
     * Parse the data sending by the board, this function parse the data in a object like {boardID,sensorID,sensorVal}
     *
     * @param {data} Data to parse in a object like {boardID,sensorID,sensorVal}
     * @param {next} Callback who return the object
     */
    function parseData(data, next) {
        var dataSplittedForIds = data.split(',');
        for (var i in dataSplittedForIds) {

            if (i != 0) {
                var dataSplittedForValues = dataSplittedForIds[i].split('=');
                dataSplittedForValues[1] = dataSplittedForValues[1].replace(/\r?\n|\r/g, "");

                if (dataSplittedForValues[0].charAt(0) != "X" | "x") {
                    next({
                        boardID: dataSplittedForIds[0].substring(1),
                        sensorID: dataSplittedForValues[0],
                        sensorVal: dataSplittedForValues[1]
                    })
                }

            }
            //Voir si faire un test de "split(*)" sur dataSplittedForValues[1] avec la dernière incrémentation (Vérifier qu'il y aie pas de checksum *)
        }
    };
    /**
     * Choose the logging method
     *
     * @param {msg} Message to log
     */
    function logIfDebug(msg) {
        switch (logging) {
            case "console":
                console.log(msg);
                break;
            case "fichier":
                fs.appendFile("./logs/GilliardPrj.log", '\n' + util.inspect(msg));
                break;
            case "":
                break;
            default:
        }
    };
};