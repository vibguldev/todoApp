// // const http = require('http')


// // const getGoogle = () => (axios.get('http://www.google.com'));

// // getGoogle()
// //   .then((responseGoogle) => {
// //     console.log(responseGoogle)
// //   })
// //   .catch(function (error) {
// //     console.log(error);
// //   });




// // let server = http.createServer(function (req, res) {
// //   // request handling logic...
// // })
// // server.listen(8000)


// var http = require('http')
// var fs = require('fs')

// var server = http.createServer(function (req, res) {
//   res.writeHead(200, { 'content-type': 'text/plain' })

//   fs.createReadStream(process.argv[3]).pipe(res)
// })

// server.listen(Number(process.argv[2]))


const http = require('http');
const fs = require('fs');
const axios = require('axios');
const getGoogle = () => (axios.get('http://www.google.com'));
var server = http.createServer(function onRequest(req, res) {
  getGoogle()
    .then((responseGoogle) => {
      res.end(responseGoogle.data)
    })
    .catch(function (error) {
      res.end(responseGoogle)
    });
});
server.listen(3000);
  // console.log('serve: ' + client_req.url);


  // var options = {
  //   hostname: 'www.google.com',
  //   port: 80,
  //   path: client_req.url,
  //   method: 'GET'
  // };

  //   var proxy = http.request("http://www.google.co.in/", function (res) {
  //     res.pipe(client_res, {
  //       end: true
  //     });
  //   });

  //   client_req.pipe(proxy, {
  //     end: true
  //   });
  // })

  