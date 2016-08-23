var fs = require('fs');
var uuid = require('uuid');

module.exports = function () {
    var guid;
    //TODO: gérer secret dans configs / index.js 
    try {
        fs.accessSync("./configs/secret.txt", fs.R_OK | fs.W_OK)
        guid = fs.readFileSync("./configs/secret.txt","UTF-8");

    } catch (e) {
        guid = uuid.v1();
        //TODO: mettre write dans try catch leve exception
        fs.writeFile('./configs/secret.txt', guid);
    }
    return guid;
}