const mysql = require('mysql');
const config = require('../../config');
const tools = require('../util');
const pool = mysql.createPool(config.database);
let query = function (sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            let newkey = [];
            let newValue = [];
            let length = 0;
            rows.map((key,index)=>{
              Object.keys(key).map((item,s) => { 
                newkey.push(tools.convertToJs(item));
                length = s+1;
              });
              newValue = newValue.concat(Object.values(key));
            });
            let count = newkey.length;
            let newRows = [];
            let one = {};
            for (let index = 0; index < count; index++) {
              Object.assign(one,{[newkey[index]]:newValue[index]});
              if (!((index+1) % length)) {
                newRows.push(one);
                one={};  
              }
            }
            resolve(newRows);
          }
          connection.release();
        });
      }
    });
  });
};

let createTable = function (sql){
  return query(sql,[]);
};

let findAllData = function (table) {
  let _sql = 'SELECT * FROM ??';
  return query(_sql, [table]);
};
let finAllDataOderBy = function (table,orderBy,rule){
  let _sql = `SELECT * FROM ?? ORDER BY ?? ${rule}`;
  return query(_sql, [table, orderBy]);

}

let findDataById = function (table, id) {
  let _sql = 'SELECT * FROM ?? WHERE id = ? ';
  return query(_sql, [table, id]);
};

let findDataByPage = function (table, keys, start, end) {
  let _sql = 'SELECT ?? FROM ??  LIMIT ? , ?';
  return query(_sql, [keys, table, start, end]);
};


let insertData = function (table, values) {
  let _sql = 'INSERT INTO ?? SET ?';
  return query(_sql, [table, values]);
};


let updateData = function (table, values, id) {
  let _sql = 'UPDATE ?? SET ? WHERE id = ?';
  return query(_sql, [table, values, id]);
};


let deleteDataById = function (table, id) {
  let _sql = 'DELETE FROM ?? WHERE id = ?';
  return query(_sql, [table, id]);
};


let select = function (table, keys) {
  let _sql = 'SELECT ?? FROM ?? ';
  return query(_sql, [keys, table]);
};

let count = function (table) {
  let _sql = 'SELECT COUNT(*) AS total_count FROM ?? ';
  return query(_sql, [table]);
};

module.exports = { 
  query,
  createTable,
  findAllData,
  finAllDataOderBy,
  findDataById,
  findDataByPage,
  deleteDataById,
  insertData,
  updateData,
  select,
  count,
};
