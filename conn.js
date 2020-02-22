const mysql = require('mysql');
const connectdb = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    // password: 'yogablpn',
    database: 'bikeskuy-db'
});

connectdb.connect(err => {
    if (err){
        throw err;
    }
    console.log(`connect to db ${connectdb.config.database} host ${connectdb.config.host} port ${connectdb.config.port}`);
})

module.exports = connectdb;
