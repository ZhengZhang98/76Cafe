/**
 * Created by Zabrina on 2018-01-20.
 */
var mysql = require('mysql');
var pool  = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "cafe"
});


var DBServices = {
  selectQuery: function(query, cb){
    pool.getConnection(function(err, con) {
      if(err) cb(err, null);
      console.log("Connected!");
      con.query(query, function (error, result, fields) {
        if(err) cb(err, null);
        console.log("Select success: "+ JSON.stringify(result));
        cb(null, result);
        con.release();
      });
    });
  },
  
  runQueryData: function(query, data, cb){
    pool.getConnection(function(err, con){
      if(err) cb(err, null);
      console.log("Connected");
      con.query(query, [data], function(err, result){
        if(err) cb(err, null);
        console.log("Affected Rows: "+ result.affectedRows);
        cb(null, result);
        con.release();
      })
    })
  }
}

module.exports = DBServices;