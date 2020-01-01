const mysql= require('mysql');
const express =  require('express');
const bodyparser =require('body-parser');
const cors=require('cors');

var app= express();
app.use(cors());
app.use(bodyparser.json());


var mysqlcon=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'friend',
    multipleStatements:true
});

mysqlcon.connect((err) => {
    if(!err)
        console.log('DB connection succeded');
    else
        console.log("DB connection failed \n Error : "+ JSON.stringify(err, undefined, 2));
}); 


//Establish the server connection
//PORT ENVIRONMENT VARIABLE
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}..`));


//Get all users
app.get('/getuser', (req, res) => {
    mysqlcon.query('SELECT * FROM user', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get an employees
app.get('/getuser/:id/:fname', (req, res) => {
    mysqlcon.query('SELECT * FROM user where Id = ? and fname= ?', [req.params.id,req.params.fname], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Insert an employees
app.post('/Insertdata', (req, res) => {
  console.log(req.body);
    mysqlcon.query("INSERT INTO `user` ( `fname`, `lname`) VALUES (?,?)",[req.body.fname,req.body.lname], (err, rows, fields) => {
        if (!err)
            {
                res.send("data inserted ");
                console.log("data inserted ");
            }
        else
            console.log(err);
    })
});