var express = require('express');
let morgan = require('morgan');
var bodyParser = require('body-parser');
let fetch = require('node-fetch');
var cors = require('cors')

var app = express();

app.use(morgan('combined'));
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }))
app.use('/biz', express.static('./client/dist'));

app.get('/api/header/:businessId', (req, res) => {
  console.log('made the HEADER api request')
  const params = req.params.businessId;
  fetch(`http://testbeanstalk-env.kferdq8c37.us-west-1.elasticbeanstalk.com/business/${params}`)
    .then((res) => {
        return res.json();
    })
    .then(json => res.send(JSON.stringify(json)));  
});

app.get('/api/reservations/:businessId', (req, res) => {
  console.log('made the RESERVATION api request')
  const params = req.params.businessId;
  // fetch(`http://127.0.0.1:3001/businesses/${params}`)
  fetch(`http://ec2-34-207-67-101.compute-1.amazonaws.com/businesses/${params}`)
    .then((res) => {
        return res.json();
    })
    .then(json => {
      res.send(json)
    });  
});

app.get('/api/photos/:id', (req, res) => {
  const id = req.params.id;
  // fetch(`http://localhost:3002/businesses/${id}`)
  fetch(`http://yelpest.us-east-1.elasticbeanstalk.com/businesses/${id}`)
    .then((res) => {
      return res.json();
    })
    .then(json => {
      console.log("photos", json);
      res.status(200).send(json)
    });
});

app.get('/api/reviews/restaurants/:id', (req, res) => {
  const id = req.params.id;
  fetch(`http://tempestyelpreviews-env.8taps9dnww.us-west-1.elasticbeanstalk.com/restaurants/${id}`)
    .then((res) => {
      return res.json();
    })
    .then(json => res.status(200).send(JSON.stringify(json)));
});

app.get('/api/reviews/reviewers/', (req, res) => {
  const id = req.params.id;
  fetch(`http://tempestyelpreviews-env.8taps9dnww.us-west-1.elasticbeanstalk.com/reviewers`)
    .then((res) => {
      return res.json();
    })
    .then(json => res.status(200).send(JSON.stringify(json)));
});

app.listen(3000);