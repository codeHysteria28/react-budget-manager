const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const cors = require('cors')
const bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
require('dotenv').config()

db.on('error', console.error.bind(console, "mongo conn err"));

db.on('connected', () => {
   console.log('connected to mongodb');
});

app.get('/', (req,res) => {
   res.sendFile(path.join(__dirname,'public','index.html'));
});

app.post('/save', (req,res) => {
   console.log(req.body);
   db.collection('user_login').insertOne(req.body, (err, data) => {
      if(err){
         console.log(err);
      }else {
         res.send('saved to db');
      }
   })
});

app.get('/ping', (req,res) => {
   return res.send('pong');
});

app.listen(process.env.PORT || 1998, () => console.log("Running on port " + process.env.PORT || 1998));