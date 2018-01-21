/**
 * Created by Zabrina on 2018-01-20.
 */
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: ""
});


con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE cafe", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});