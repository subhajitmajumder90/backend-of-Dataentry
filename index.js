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
        if (!err){
            res.json({data:rows}).status(200);
            console.log(rows);
        }
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
                res.json("inserted");
                console.log("data inserted ");
            }
        else
            console.log(err);
    })
});
//fetch data id wise for update
app.get('/fetch/:Id', (req,res)=>{
    mysqlcon.query("select * from user where Id = ?",[req.params.Id], (err, rows, fields)=>{
        if(err){
            res.json("Error");
        }
        else{
            data=rows[0];
            res.json({stat:"Success", data}).status(200);
            //res.json(rows[0]);
            console.log(rows);
        }
    });

});
//update with id wise
app.post('/update', (req,res)=>{
    console.log(req.body);
    mysqlcon.query("update user set fname = ?, lname = ? where Id = ?",[req.body.fname,req.body.lname,req.body.Id], (err, rows, fields)=>{
        if(err){
            res.json("Error");
        }
        else{
            res.json("Success");
        }
    });
});

//Delete an employees
app.get('/delete/:id', (req,res)=>{

    mysqlcon.query("delete from user where Id = ?",[req.params.id], (err, rows, fields)=>{
        if(err){
            res.json("Error")
            console.log('Error');
        }
        else{
            res.json("Success")
            console.log('Success');
        }
    });
});


//Delete an employee by post method

app.post('/deletebypost',(req,res)=>{
console.log(req.body);
    mysqlcon.query("delete from user where Id = ?",[req.body.id],(err,rows,fields)=>{
        if(err){
            res.json(err)
        }
        else{
            res.json("Success")
        }
    });


});