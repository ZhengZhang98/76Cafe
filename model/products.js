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
var data = [
  ['C01', 'Mocha'],
  ['C02', 'Cappuccino'],
  ['C03','Espresso'],
  ['C04', 'Caramel Macchiato'],
  ['MK1','Hong Kong Style Milk Tea'],
  ['MK2','Matcha Milk Tea'],
  ['MK3', 'Rose Milk Tea'],
  ['MK4', 'Japanese Fried Milk Tea']
];

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("INSERT INTO Products (id, name) VALUES ?", [data], function (err, result) {
    if (err) throw err;
    console.log("Number inserted: "+ result.affectedRows);
  });
});