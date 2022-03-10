const express = require("express");
const app = express();
const port = 3000;

const handlebars = require("express-handlebars");

const bodyParser = require("body-parser");
// const multer = require("multer");
const db = require("./config/connect.js");
const UserModel = require("./models/user");
const mongoose = require("mongoose");

app.use(bodyParser.urlencoded({ extended: false }));

app.engine(
  "hbs",
  handlebars.engine({
    layoutsDir: __dirname + "/views/layouts",
    extname: "hbs",
    defaultLayout: "planB",
    partialsDir: __dirname + "/views/partials/",
    helpers: require("./helpers/handlebars-helpers")
  }),
);

app.set("view engine", "hbs");

app.use(express.static("public"));

db.connectDb();


const getUsers = async () => {
  const usersList = UserModel.find({}).lean();

  return usersList;
}

const shiftElements = (array, from, to) => {
  let cutOut = array.splice(from, 1) [0];
  array.splice(to, 0, cutOut)
}



// index page

// to count the amount of times the page has been visited by the user. this to serve the correct object from array
let counter1 = 0;
let counter2 = 2;

app.get("/", async (req, res) => {

  counter1 = 0;
  counter2 = 2;
  // for ease, counter is always on 0 when on start page

  try{

    getUsers().then((result) => {

      console.log(`counter1 is ${counter1}`)
      console.log(`counter2 is ${counter2}`)

      result = result.slice(counter1, counter2)
      
      res.render("main", {
        layout: "index",
        data: result
      })
    })

   

  } catch(err){
    console.log(err)
  }

});

// if like has been pressed

app.post("/like/:id", async (req, res) => {
  console.log("like");

  try{

    counter1++;
    counter2++;
    
    const userCount = await UserModel.find({}).lean();

    getUsers().then((result) => {

      console.log(`counter1 is ${counter1}`)
      console.log(`counter2 is ${counter2}`)

      result = result.slice(counter1, counter2)

      res.render("main", {
        layout: "index",
        data: result
      })
    })

    // find actual amount of users in array

    console.log(userCount.length)

    // if the counter goes beyond the amount of users in array, reset back
    if (counter2 == userCount.length + 2) {
      counter1 = 0;
      counter2 = 2;
    }
    

  } catch(err){
    console.log(err)
  }

});

// if dislike has been pressed

app.post("/dislike/:id", async (req, res) => {
  console.log("dislike");

  try{

    counter1++;
    counter2++;
    
    const userCount = await UserModel.find({}).lean();

    getUsers().then((result) => {

      console.log(`counter1 is ${counter1}`)
      console.log(`counter2 is ${counter2}`)

      result = result.slice(counter1, counter2)

      res.render("main", {
        layout: "index",
        data: result
      })
    })

    // find actual amount of users in array

    console.log(userCount.length)

    // if the counter goes beyond the amount of users in array, reset back
    if (counter2 == userCount.length - 1) {
      counter1 = 0;
      counter2 = 2;
    }
    

  } catch(err){
    console.log(err)
  }
});


// create new users to add to database

app.get("/create-user", (req, res) => {
  res.render("createUser", {
    layout: "index",
  });
});

app.post("/api/user", (req, res) => {
  const saveUser = new UserModel(req.body);

  saveUser.save((error, savedUser) => {
    if (error) throw error;
    res.json(savedUser);
    console.log("saveuser");
    console.log(savedUser);
  });
});

app.get("*", (req, res) => {
  res.send(`${404} not found`);
});

app.listen(port, () => console.log(`App listening to port ${port}`));

// useful: https://waelyasmina.medium.com/a-guide-into-using-handlebars-with-your-express-js-application-22b944443b65
