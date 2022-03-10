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
let counter = 0;
let counter2 = 1;

app.get("/", async (req, res) => {

  counter = 0;
  counter2 = 1;
  // for ease, counter is always on 0 when on start page

  try{

    getUsers().then((result) => {

      console.log(`counter is ${counter}`)
      console.log(`counter2 is ${counter2}`)

      result.length = 2;
      
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

    counter++;
    counter2++;
    
    const userCount = await UserModel.find({}).lean();

    getUsers().then((result) => {

      console.log(`counter is ${counter}`)
      console.log(`counter2 is ${counter2}`)

      console.log(result)

      result = result.slice(counter, counter2)

      console.log(result)

      res.render("main", {
        layout: "index",
        data: result
      })
    })

    // find actual amount of users in array

    console.log(userCount.length)

    // if the counter goes beyond the amount of users in array, reset back
    if (counter2 == userCount.length - 1) {
      counter = 0;
      counter2 = 1;
    }
    

  } catch(err){
    console.log(err)
  }

});

// if dislike has been pressed

app.post("/dislike/:id", async (req, res) => {
  console.log("dislike");

  try{

    counter++;

    // find the users from database, serve only one, skip users based on counter amount
    let users = await UserModel.find({}, null, {skip: counter, limit: 1}).lean();

    console.log(`current amount of users is ${users.length}`)

    console.log(`counter is on ${counter}`)

    console.log(`current user id is ${users._id}`)

    // find actual amount of users in array
    const userCount = await UserModel.find({}).lean();

    console.log(`total amount of users is ${userCount.length}`)

    // if the counter goes beyond the amount of users in array, reset back
    if (counter == userCount.length - 1) {
      counter = -1;
    }

    res.render("main", {
      layout: "index",
      data: users
    })

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
