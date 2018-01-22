/**
 * Created by Zabrina on 2018-01-20.
 */
var express = require('express');
var router = express.Router();
var DBService = require('../services/dbservice');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/order', function (req, res, next){
  
  var query = "SELECT * FROM Orders";
  DBService.selectQuery(query, function(err, result, fields){
    if(err){
      handleError(res, err);
    }
    res.status(200).end(JSON.stringify(result));
  })
  
});

router.post('/order', function(req, res, next){
  var data1 = {
    "Name":req.body.Name,
    "Address":req.body.Room,
    "Product":req.body.Product,
    "Time":req.body.Time,
    "Note":req.body.Note
  };
  console.log(JSON.stringify(data1));
  if(data1.Name === ""){
    var err = {
      "status": '400',
      "message": "Invalid input or Missing input."
    };
    res.status(400).end(JSON.stringify(err));
  }else{
    var data = [
      [data1.Name, data1.Address, data1.Product, data1.Time, data1.Note]
    ];
    var query = "INSERT INTO Orders (name, address, p_id, time, note) VALUES ?";
    DBService.runQueryData(query, data, function(err, result){
      if(err) handleError(res, err);
      console.log("Order Posted: "+ JSON.stringify(result));
      var response = {
        "status": '200',
        "message": "Thanks for ordering from 76 Cafe! Hope you can get all 7's in the IB exam!"
      };
      res.status(200).end(JSON.stringify(response));
    });
  }
});

router.post('/delete/:id', function(req, res, next){
  var query = "DELETE FROM Orders WHERE id = "+ req.params.id;
  DBService.selectQuery(query, function(err, result, fields) {
    if(err) handleError(res, err);
    res.status(200).end(JSON.stringify(result));
  })
});

//in services
function handleError(res, err){
  console.log("error: "+ err);
  res.status(400).send({
    message: err
  })
}

module.exports = router;
