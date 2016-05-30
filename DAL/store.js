var Sequelize = require('sequelize');
var sequelize = new Sequelize('test_node', 'user', 'pass')

var User = sequelize.define('users', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
});

sequelize.sync().then(function() {
  return User.create({
    username: 'janedoe6',
    birthday: new Date(1980, 6, 20)
  });
})

/*
var db = {
    Module: [],
    addModule: function (mod, sens, val) {

    }
};


exports.db = db;
*/