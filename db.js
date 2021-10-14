const Pool = require('pg').Pool

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    // password stored in conf file
    database: 'user-info-example',
    port: 5432
})

module.exports = pool;