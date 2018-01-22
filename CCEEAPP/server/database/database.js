var Sequelize = require('sequelize');
var local = new Sequelize('postgres://rarffxnu:VfrUqQkeX8C-O7kaYn9d5RAhTzecorq4@horton.elephantsql.com:5432/rarffxnu',{
    dialect:'postgres',
    dialectOptions:{
        ssl: {
            require:true
        }
    }
});

var ccee = new Sequelize('postgres://postgres@localhost:5432/postgres',{
    dialect:'postgres'
});

module.exports = {
    'local':local,
    'ccee':ccee
}
