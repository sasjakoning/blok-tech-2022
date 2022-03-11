const express = require("express");
const app = express();
const port = 3000;

const handlebars = require("express-handlebars");

const bodyParser = require("body-parser");
// const multer = require("multer");
const db = require("./config/connect.js");
const UserModel = require("./models/user");
const AdminUserModel = require("./models/adminUser");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId

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


// get all users from database
const getUsers = async () => {
  const usersList = UserModel.find({}).lean();

  return usersList;
}

let isMatched = false;

// index page

// to count the amount of times the page has been visited by the user. this to serve the correct object from array
let counter1 = 0;
let counter2 = 2;

app.get("/", async (req, res) => {

  counter1 = 0;
  counter2 = 2;
  // for ease, counter is always on 0 when on start page

  try{

    // get users
    getUsers().then((result) => {

      console.log(`counter1 is ${counter1}`)
      console.log(`counter2 is ${counter2}`)

      // only return two users from the array
      result = result.slice(counter1, counter2)
      
      // send result to handlebars
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

    req.params.id = toId(req.params.id)

    const likedUser = await UserModel.findById(req.params.id).lean()

    const admin = await AdminUserModel.findOne({username: "adminuser"})

    // put users in variable to check length
    const userCount = await UserModel.find({}).lean();

    // find users
    getUsers().then((result) => {
  
      counter1++;
      counter2++;
    

      console.log(`counter1 is ${counter1}`)
      console.log(`counter2 is ${counter2}`)

      // only send 2 users
      result = result.slice(counter1, counter2)

      console.log(userCount.length)

      // if the counter goes beyond the amount of users in array, reset back
      if (counter2 == userCount.length) {
        counter1 = 0;
        counter2 = 2;
      }

      console.log(likedUser)

      if(likedUser.likes[0]){
        if(likedUser.likes[0].equals(admin._id)){
          console.log("Match!")
  
          isMatched = true;
  
          res.render("main", {
            layout: "index",
            data: result,
            likedUser: likedUser,
            isMatched: isMatched
          })
        }

      }else{
        console.log("nope")

        res.render("main", {
          layout: "index",
          data: result
        })
      }

    })
    

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

// view matches

app.get("/matches", async (req, res) => {

  const admin = await AdminUserModel.findOne({}).populate("likes").lean()

  const adminLikes = admin.likes[0]

  console.log(adminLikes)


  res.render("matches", {
    layout: "index",
    data: adminLikes
  })
})


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
