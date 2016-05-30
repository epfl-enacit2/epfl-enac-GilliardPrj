module.exports = function (configFilePath) {
    return {
        store: {
            username: '',
            password: '',
            name:''
        },
        module: {
            port: '',
            rate: 9600
        },
        logging: {
            logToConsole: true
        }
    };
}