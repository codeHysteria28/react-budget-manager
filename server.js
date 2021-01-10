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

// Schemas
import User from './Schemas/User';


db.on('error', console.error.bind(console, "mongo conn err"));

db.on('connected', () => {
   console.log('connected to mongodb');
});

app.get('/', (req,res) => {
   res.sendFile(path.join(__dirname,'public','index.html'));
});

app.post('/save', (req,res) => {
   console.log(req.body);
   if(req.body !== {}) {
      const user = new User({ 
         username: req.body.username,
         password: req.body.password,
         conf_password: req.body.conf_password,
         created_at: req.body.created_at
      });
      user.save();
   }else {
      console.log("error saving data");
   }
});

app.get('/ping', (req,res) => {
   return res.send('pong');
});

app.listen(process.env.PORT || 1998, () => console.log("Running on port " + process.env.PORT || 1998));