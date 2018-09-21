var express = require('express');
let morgan = require('morgan');
var bodyParser = require('body-parser');
let fetch = require('node-fetch');

var app = express();

app.use(morgan('combined'));

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/biz', express.static('./client/dist'));

app.get('/api/header/:businessId', (req, res) => {
  console.log('made the HEADER api request')
  const params = req.params.businessId;
  fetch(`http://127.0.0.1:3004/business/${params}`)
    .then((res) => {
        return res.json();
    })
    .then(json => res.send(JSON.stringify(json)));  
});

app.get('/api/reservations/:businessId', (req, res) => {
  console.log('made the RESERVATION api request')
  const params = req.params.businessId;
  fetch(`http://127.0.0.1:3001/businesses/${params}`)
    .then((res) => {
        return res.json();
    })
    .then(json => {
      console.log("json data, reservations", json)
      res.send(json)
    });  
});

// app.get('/api/photos/:businessId', (req, res) => {
//   console.log('made the RESERVATION api request')
//   const params = req.params.businessId;
//   fetch(`http://127.0.0.1:3001/businesses/${params}`)
//     .then((res) => {
//         return res.json();
//     })
//     .then(json => {
//       console.log("json data, reservations", json)
//       res.send(json)
//     });  
// });

app.listen(3000);