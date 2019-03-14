const express = require('express')
const app = express()
const path = require('path')
// const BodyParser= require('body-parser');
// app.use(BodyParser.urlencoded({ extended: true }));
const webpush = require('web-push');

const vapidKeys = {
  publicKey:
'BEl62iUYgUivxIkv69yViEuiBIa-Ib9-SkvMeAtA3LFgDzkrxZJjSgSnfckjBJuBkr3qBUYIHBQFLXYp5Nksh8U',
  privateKey: 'UUxI4O8-FbRouAevSmBQ6o18hgE4nSG3qwvJTfKc-ls'
};

webpush.setVapidDetails(
  'mailto:web-push-book@gauntface.com',
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

// push的数据
const payload = {
    title: '一篇新的文章',
    body: '点开看看吧',
    icon: '/html/app-manifest/logo_512.png',
    data: {url: "https://fed.renren.com"}
  //badge: '/html/app-manifest/logo_512.png'
};


app.use(express.static('dist/angular-tour-of-heroes'))

app.post('/hello', (req, res) => {
  let str = ''
  req.on('data',(chunk)=>{
    str += chunk
  })
  req.on('end',()=>{
    let pushSubscription = JSON.parse(str)
    // console.log(pushSubscription.endpoint)
    // console.log(pushSubscription.expirationTime)
    webpush.sendNotification(pushSubscription, JSON.stringify(payload)).then(res=>{
      console.log('send success')
    }).catch(err=>{
      console.log('send error')
    });
    // setInterval(()=>{
    //   console.log('new message')
    //   webpush.sendNotification(pushSubscription, JSON.stringify(payload))
    // },5000)
  })
  
  res.send({data: `hello`})
})

const heroes = [
  { id: 11, name: 'Mr. Nice' },
  { id: 12, name: 'Narco' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];

app.get('/api/heroes', (req, res) => {
  res.send(heroes)
})

app.listen(8181, () => console.log('Example app listening on port 8088!'))



// const http2 = require('spdy');
// var fs = require('fs');
// // var options = {
// //   key: fs.readFileSync('./files/server-key.pem'),
// //   ca: [fs.readFileSync('./files/ca-cert.pem')],
// //   cert: fs.readFileSync('./files/server-cert.pem')
// // };
// console.log(http2)
// http2.createServer({}, (req, res) => {
//   // res.writeHead(200);
//   res.end('hello world\n');
// }).listen(8089,()=>console.log('8089 listening'))