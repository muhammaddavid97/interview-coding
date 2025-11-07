const mariadb = require("mariadb")

const pool = mariadb.createPool({
    host: 'localhost', 
    user: 'root',      
    password: 'd4v1d', 
    database: 'CifroInc', 
    connectionLimit: 10
})

let getConnection = async err => {
    
    try{
        const conn = await pool.getConnection();
        return conn;
    }
    catch(err){
        console.log(err)
    }
}

module.exports = {pool, getConnection}