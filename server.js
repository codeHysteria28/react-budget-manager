const express = require('express');
const app = express();
const path = require('path');
const db = require('./db');
const cors = require('cors')
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
   origin: "http://localhost:1999", // <-- location of the react app were connecting to
   credentials: true,
}));
require('dotenv').config()

app.use(session({
   secret: "secretcode",
   resave: false,
   saveUninitialized: false,
}));

app.use(cookieParser('secretcode'));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

// Schemas
const User = require('./Schemas/User');

db.on('error', console.error.bind(console, "mongo conn err"));

db.on('connected', () => {
   console.log('connected to mongodb');
});

app.get('/', (req,res) => {
   res.sendFile(path.join(__dirname,'public','index.html'));
});

// login user
app.post('/login', (req,res,next) => {
   passport.authenticate("local",(err,user,info) => {
      if(err) throw err;
      if(!user) res.send("No user exists");
      else {
         req.logIn(user, (err) => {
            if(err) throw err;
            res.send("Successfully Authenticated");
         });
      }
   })(req, res, next);
});

// register user
app.post('/register', (req,res) => {
   if(req.body !== {}) {
      User.findOne({username: req.body.username}, async (err, doc) => {
            if(err) throw err;
            if (doc) res.send('User Already Exists');
            if(!doc){
               // prepare salt for hashing
               let salt = bcrypt.genSaltSync(10);
               const password = bcrypt.hashSync(req.body.password, salt);
               const conf_password = bcrypt.hashSync(req.body.conf_password, salt);

               // apply data for prepared schema
               const user = new User({
                  username: req.body.username,
                  password: password,
                  conf_password: conf_password,
                  created_at: req.body.created_at
               });

               // save user to db
               await user.save();

               // send response
               res.send('success');
            }
      });
   }else {
      res.send('error');
   }
});

app.get("/user", (req, res) => {
   res.send(req.user); // The req.user stores the entire user that has been authenticated inside of it.
});

// logging out user
app.post('/logout', (req,res) => {
   req.logout();
   req.session.destroy((err) => {
      res.clearCookie('connect.sid',{path:'/'});
      res.send('logout');
   });
   req.logout();
});

// backend functionality test
app.get('/ping', (req,res) => {
   return res.send('pong');
});

app.listen(process.env.PORT || 1998, () => console.log("Running on port " + process.env.PORT || 1998));