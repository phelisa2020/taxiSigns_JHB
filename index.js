const express = require("express");

const exphbs = require('express-handlebars');

// //get body parser / instantiate
const bodyParser = require('body-parser');
const taxis = require('./taxi')
//require the settings bill factory function
// const shoes = require("./public/shoes");
// const api = require('./api');

// create an instance for the app, instantiate it.
const app = express();


// always require your pg
const pg = require("pg");
const Pool = pg.Pool

// const greetings = greet(pool);
// const apiFactory = api(instance)
//after ive instantiate my app ,configure , expressJs as handlebars(middleware)
app.engine('handlebars', exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

//make the public folder visible when using express, could be css ,js ,page wanst styled.now can see the middleware
// http://localhost:3011/css/style.css --- to see your css

app.use(express.static('public'));

// // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// // parse application/json
app.use(bodyParser.json());

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/taxi';

const pool = new Pool({
    connectionString
  });

// const taxi = Taxi(pool);

app.get("/", async function (req, res) {


  res.render("index", {

  });

});



app.get("/practise", async function (req, res) {


  res.render("practise", {

  });

});

app.post("/practise", async function (req, res) {


    res.render("practice", {
  
    });
  
  });
  


app.get("/congra", async function (req, res) {


  res.render("congra", {

  });

});





const PORT = process.env.PORT || 3015

app.listen(PORT, function () {
  console.log("app started at port:", PORT);

});