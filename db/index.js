const mysql = require('mysql');
const config = require('./config');
const { debug } = require('../conf/config');

function connect() {
    return mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database,
        multipleStatements: true
    })
}

function querySql(sql) {
    const conn = connect();
    debug && console.log(sql);
    return new Promise((resolve, reject) => {
        try {
            conn.query(sql, (err, res) => {
                if (err) {
                    debug && console.log('查询失败，原因:' + JSON.stringify(err));
                    reject(err);
                } else {
                    debug && console.log('查询成功', JSON.stringify(res));
                    resolve(res);
                }
            })
        } catch (error) {
            reject(error);
        } finally {
            conn.end();
        }
    })
}

function queryOne(sql) {
    return new Promise((resolve, reject) => {
      querySql(sql)
        .then(results => {
          if (results && results.length > 0) {
            resolve(results[0])
          } else {
            resolve(null)
          }
        })
        .catch(error => {
          reject(error)
        })
    })
}

module.exports = {
    querySql,
    queryOne
}