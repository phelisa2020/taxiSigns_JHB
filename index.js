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

const connectionString = process.env.DATABASE_URL || 'postgresql://thembajoseph:themba17307@localhost:5432/shoe-database';

const pool = new Pool({
  connectionString
});
//instance
const instance = taxis(pool);
//const instance = waiterer(pool);

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


app.get("/", async function (req, res) {


  res.render("index", {

  });

});


app.get('/api/players', (req, res) => {
  const players =  [
    {
           playername: 'Thabang', signname: "central", tm_model_tag: 2 , player_score: 3
    }, {
          playername: 'Jane', signname: "fourways", tm_model_tag: 3, player_score: 3
    },{
          playername: 'Thabiso', signname: "midrand", tm_model_tag: 1, player_score: 2
    },{
          playername: 'Sipho', signname: "central", tm_model_tag: 2, player_score: 1
    },

  ]


  res.send(players)
})

app.post('/api/players', (req, res)=> {
  const data = req.body;

  console.log({data})
  res.send({status:200})
})





app.post("/practise/:",  async function (req, res) {

  try {

      var { signname } = await req.params;
      //this is to select one day because whe you select on day it become a string instead of an array , so this special function does that for you.
      //checks if its an array if not makes it one.
      signname = Array.isArray(req.body.signname) ? req.body.signname : [req.body.signname];

      // let userName = req.params.userName;

      let playerName = req.body.playerName;


      playername = playername.charAt(0).toUpperCase() + playername.slice(1).toLowerCase();
      // console.log({ userName });
      var regex = /^[a-zA-Z]+$/;


      if (playername != null && regex.test(playername)) {
          // console.log({ days });

          // check if name and days are defined
          results = await instance.wf(playername, signs);
          console.log({ results });
         


          const flashMsg = await instance.buttonMessage();

          req.flash('regexMes', flashMsg);

      }
    
      res.render("index", {
          //copy userName from get req.params.userName, render userName , then in index.handlebars {{userName}} = sender it dynamically
          playerName,
          allPlayers: results,
        

      });


  } catch (error) {
      console.log(error.name);
      console.log(error.message);
      console.log(error.stack);

  }

});



app.get("/practise/:location", async function (req, res) {

  const location = req.params.location

  res.render("practise", {
      img : "/img/" + location + ".jpg",

      location,

      // web: "http://localhost:3015/practise/" + "/public/ "location
  });

});

app.post("/practise", async function (req, res) {


    res.render("practice", {
  
    });i
  
  });
  


app.get("/congra", async function (req, res) {


  res.render("congra", {

  });

});





const PORT = process.env.PORT || 3015

app.listen(PORT, function () {
  console.log("app started at port:", PORT);

});