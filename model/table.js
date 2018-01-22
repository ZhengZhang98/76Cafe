/**
 * Created by Zabrina on 2018-01-20.
 */
var secret = require('../services/secret');
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: secret,
  database: "cafe"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var products = "CREATE TABLE Products (id VARCHAR(255) PRIMARY KEY, name VARCHAR(255))";
  var orders = "CREATE TABLE Orders (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255),address VARCHAR(255),p_id VARCHAR(255),time VARCHAR(255),note VARCHAR(255),FOREIGN KEY (p_id)REFERENCES Products(id))";
  con.query(products, function (err, result) {
    if (err) throw err;
    console.log("Products Table created");
    con.query(orders, function(err, result){
      if(err) throw err;
      console.log("Orders Table created");
    })
  });
});