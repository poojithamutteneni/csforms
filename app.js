var express = require('express');
var bodyParser =require('body-parser');
var app = express();
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Girlboss06",
  database: "formdb"
});

var urlencodedParser = bodyParser.urlencoded({ extended: false});

app.set('view engine', 'ejs');

app.get('/'  , function(req,res){
  res.render('contact')
});

app.get('/contact'  , function(req,res){
  res.render('contact')
});

app.get('/form', (req,res)=>{
  con.query('select* from forms',(err,rows,feilds)=>{
    if(!err)
    res.send(rows);
    else
      console.log(err);
  })
});
app.get('/form/:id', (req,res)=>{
  con.query('select* from forms where fullname= ?', [req.params.id], (err,rows,feilds)=>{
    if(!err)
    res.send(rows);
    else
      console.log(err);

  })
});
app.delete('/form/:id', (req,res)=>{
  con.query('delete from forms where fullname= ?', [req.params.id], (err,rows,feilds)=>{
    if(!err)
    res.send('Deleted succesfully.');
    else
      console.log(err);

  })
});
app.post('/contact' ,  urlencodedParser,function(req,res){
  let name= req.body.name;
  let department=req.body.department;
  let email=req.body.email;
  console.log(req.body);
  console.log(req.body.name);
  console.log(req.body.department);
  console.log(req.body.email);
  con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "INSERT INTO forms(fullname, department,email) VALUES ('"+name+"','"+ department+"','"+ email+"')";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
  });
})
  res.render('contact-success', {data: req.body});
});

app.listen(3000);
