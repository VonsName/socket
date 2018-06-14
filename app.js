const http=require('http');
const fs=require('fs');
const mysql=require('mysql');
//const io=require('socket.io');
const bodyParser=require('body-parser');
const url=require('url');

//数据库
let db=mysql.createPool({host:'localhost',user:'root',password:'root',database:'node'});
let server=http.createServer((req,response)=>{
    let {pathname,query}=url.parse(req.url,true);
    //let json=url.parse(req.url,true);
    //console.log(json);
    //console.log(pathname);
   // console.log(query);
    if (pathname==='/reg'){
        let {username,password}=query;
        db.query(`select * from user where username='${username}'`,(err,data)=>{
           if (err){
               response.write(JSON.stringify({code:1,msg:"数据库错误"}));
           }  else {
               if (data.length>0){
                   console.log('用户存在');
                   response.write(JSON.stringify({code:1,msg:"用户已经存在"}));
               } else {
                   db.query(`insert into user(username,password) values('${username}','${password}')`,(err)=>{
                       if (err){
                           response.write(JSON.stringify({code:1,msg:"注册失败"}));
                       } else {
                           console.log('注册成功');
                           response.write(JSON.stringify({code:0,msg:"注册成功"}));
                       }
                   });
               }
           }
        });

    } else if (pathname==='/login'){
        let {username,password}=query;
        db.query(`select * from user where username='${username}'`,(err,data)=>{
           if (err){
               console.log('数据库异常')
           }else {
               if (data.length===0){
                   console.log('用户不存在');
               } else {
                   if (password!==data[0].password){
                       console.log('密码错误');
                   } else {
                       console.log('登录成功');
                   }
               }
           }
        });
    } else {
        fs.readFile(`./www${pathname}`,(err,data)=>{
            if (err){
                response.writeHeader(404);
                response.write('path not found');
            } else {
                response.write(data);
            }
        });
        //res.end();
    }
});
//server.use(bodyParser({}));
server.listen(8080);