// 몽고디비 연결
const mongoclient = require('mongodb').MongoClient;
const ObjId = require('mongodb').ObjectId;
const url = "mongodb+srv://amdin:123@cluster0.4pwjx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let mydb; //데이터베이스 객체 참조변수 선언
mongoclient.connect(url).then((client)=>{
  mydb = client.db('mtboard');
  app.listen(8080, function(){
    console.log("포트 번호 8080으로 서버 대기중 ... ")
  });
}).catch((err)=>{
   console.log("DB 접속 오류", err);
});


const express = require('express');
const app = express();
const mysql2 = require('mysql2');

const conn = mysql2.createConnection({

    host:"localhost",
    user:"root",
    password: "root",
    database: "myboard"
});

conn.connect(function(err){
    if(err){
        console.log("접속 오류", err);
        return;
    }
    console.log("접속 성공");
});

//body-parser 라이브러리(미들웨어) 추가
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/book', function(req, res){
    res.send('도서 목록 관련 페이지입니다.');
});
app.get('/welcome', function(req, res){
  res.send('<html><body> <h1>/welcome<h1> <marquee>사용자님 환영합니다!.<marquee/></body></html>');
});
app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

  // 데이터 조회 query("SQL문", 콜백함수(err,rows,fields){})
app.get("/list",function(req,res){
  mydb.collection("post").find().toArray().then((result)=>{
     console.log(result);
      // res.send(result);
      res.render('list.ejs',{data:result});
  }).catch((err)=>{
    console.log("데이터 조회 실패", err);
  });
     //client로 결과 페이지 전송
     //res.sendFile(__dirname + '/list.html');
});
// localhost:8080/enter 요청에 대한 처리 루틴
app.get('/enter', function(req, res){
  // res.sendFile(__dirname + '/enter.html');
  res.render('enter.ejs')
});

app.post('/save',function(req,res){
      console.log(req.body.title);
      console.log(req.body.content);

      mydb.collection("post").insertOne(
        {title:req.body.title, content: req.body.content, date:req.body.someDate}
      ).then((result)=>{
        console.log("저장완료",result);
      });
      // let sql = "insert into post(title, content,created) values(?, ?, now())";
      // let params = [req.body.title,req.body.content];
      // conn.query(sql, params, function(err,result){
      //   if(err) throw err;
      //   console.log("저장완료",result);
        res.send("데이타 추가 성공");
      });

      //클라이언트에서 ajax로 localhost:8080/update 요청에 대한 처리 루틴
app.post("/delete", function(req, res){
  console.log("1 :",req.body._id);
  if (!req.body._id || !ObjectId.isValid(req.body._id)){
    console.log('2.error: ', "유효하지않은 ID값 입니다.");
  }
  req.body._id = new ObjId(req.body._id);
  console.log('3.삭제할 번호:',req.body); //삭제할 번호
  console.log("4.삭제완료"); //삭제할 번호
});