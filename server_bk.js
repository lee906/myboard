const express = require('express');
const app = express();

app.listen(8080, function(){
  console.log('포트8080으로 서버 대기중 ...');
});

app.get('/book',function(request, response){
  response.send('도서 목록 관련 페이지입니다.');
});

// app.get('/',function(request, response){
//   response.send('/ 홈경로입니다.');
// });
app.get('/welcome',function(request, response){
  response.send('<html><body> <h1>/welcome<h1> <marquee>홍길동님 환영합니다..</marquee></body></html>');
});

// app.get('/', (request,response)=>{
//   console.log(__dirname);
//   response.sendFile(__dirname +'/index.html');
// })
app.get('/signin', (request,response)=>{
  console.log(__dirname);
  response.sendFile(__dirname +'/signin');
})