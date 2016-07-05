var stringBuilder = require('string');

module.exports = function (properties){
        var debug = properties.configs.logging.logToConsole;
        var SerialPort = properties.sPort.SerialPort;
        //var port = new SerialPort("COM3", {
        var port = new SerialPort(properties.configs.Modules[0].port, {
            baudrate: properties.configs.Modules[0].rate,
            parser: properties.sPort.parsers.readline('\n')
        });

        port.on('open', function () {

            logIfDebug('open');

            port.on('data', function (data) {

                if (data.charAt(0) == '>') {

                    parseData(data, function (cleanData) {
                        logElements(cleanData);
                        cleanData.map(function (element) {
                            if (element.sensorID.charAt(0) != "X" | "x") {
                                properties.store.caca(element);
                            }
                        });

                        logIfDebug("\r")
                    });
                }
                else {
                    //Si le caractère est / c'est un commentaire --> dans console
                    if (data.charAt(0) == '/') {
                        logIfDebug('Commentaires: ' + data);
                    }
                    else {
                        logIfDebug('Error :' + data)
                    }
                }
            });
        });

        function logElements(elements) {
            elements.forEach(function (element) {
                console.log(element);
            });
        }

        function logIfDebug(msg) {
            if (debug == true) {
                console.log(msg);
            }
        }

        function parseData(data, next) {
            var cleanData = [];
            var dataSplitted = data.split(',');
            var ModuleID = dataSplitted[0].substring(1);
            //console.logIfDebug('BoardId : ' + ModuleID);
            for (var i in dataSplitted) {

                if (i != 0) {
                    var dataReSplitted = dataSplitted[i].split('=');
                    dataReSplitted[1] = removeEnter(dataReSplitted[1]);

                    cleanData.push({
                        boardID: dataSplitted[0].substring(1),
                        sensorID: dataReSplitted[0],
                        sensorVal: dataReSplitted[1]
                    });

                }
                //Voir si faire un test de "split(*)" sur dataReSplitted[1] avec la dernière incrémentation (Vérifier qu'il y aie pas de checksum *)
            }
            next(cleanData, null);
        };

        function removeEnter(data) {
            if (stringBuilder(data).contains('\r')) {
                return stringBuilder(data).chompRight('\r').s;
            }
            else {
                return data;
            }
        }



    return {
        
    };

};