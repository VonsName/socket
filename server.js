const express=require('express');
const eStatic=require('express-static');
const io=require('socket.io');
const mysql=require('mysql');
let db=mysql.createPool({host:'localhost',user:'root',password:'root',database:'node'});
db.query('select * from banner',(err,data)=>{

});
const app=express();
app.listen(8080);
app.use(eStatic('./www'));