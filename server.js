var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var methodOverride = require('method-override');
var cors = require('cors');
var mysql = require('mysql');

var app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cors());


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "myproject01"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


app.post('/insert', function(req, res){

  var sql = "INSERT INTO master (name, id_req, name_req) VALUES ('"+req.body.name+"', '"+req.body.req_id+"', '"+req.body.req_name+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    res.json("successful");
  });

});


app.post('/read', function(req, res){

  var sql = "SELECT * FROM master";
  con.query(sql, function (err, result) {
    if (err) throw err;
    var data = [];
    var i = 0;
    while(result[i] != null){
      data[i] = result[i];
      i++;
    }
    res.json(data);
});



});

app.post('/update', function(req, res){
  var int = parseInt(req.body.id);
  var sql = "UPDATE master SET name='"+req.body.name+"', id_req='"+req.body.req_id+"', name_req='"+req.body.req_name+"' WHERE id="+int;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("record updated");
    res.json("updated");
  });

});

app.post('/delete', function(req, res){
  var int = parseInt(req.body.id);
  var sql = "DELETE FROM master WHERE id="+int;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("record deleted");
    res.json("deleted");
  });

});

app.post('/detail', function(req, res){
  var int = parseInt(req.body.id);
  var sql = "SELECT * FROM master WHERE id="+int;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("details fetched");
    res.json(result);
  });

});






app.listen(process.env.PORT || 8080);
