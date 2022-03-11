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

// to count the amount of times the page has been visited by the user. this to serve the correct object from array
let counter1 = 0;
let counter2 = 2;



/**************/
/* index page */
/**************/


app.get("/", async (req, res) => {


  try{
    counter1 = 0;
    counter2 = 2;
    // for demo purposes, counter is always reset when on start page

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



/****************************/
/* if like has been pressed */
/****************************/

app.post("/like/:id", async (req, res) => {
  console.log("like");

  try{

    // turns id into ObjectId instead of a string with number
    req.params.id = toId(req.params.id)

    // find the user that's been liked
    const likedUser = await UserModel.findById(req.params.id).lean()

    // find the admin user (which is being used as "logged in user" for demo purposes)
    const admin = await AdminUserModel.findOne({username: "adminuser"})

    // put all users in variable to check length
    const userCount = await UserModel.find({}).lean();

    // find users
    getUsers().then((result) => {
  
      // add to the counter everytime "like" is pressed aka: link is visited
      counter1++;
      counter2++;
    
      console.log(`counter1 is ${counter1}`)
      console.log(`counter2 is ${counter2}`)

      // only send 2 users
      result = result.slice(counter1, counter2)

      console.log(userCount.length)

      // if the counter goes beyond the amount of users in array, reset back to original
      if (counter2 == userCount.length) {
        counter1 = 0;
        counter2 = 2;
      }

      // check if the liked user has own likes as well
      if(likedUser.likes[0]){
        // if true, check if the like in the likedUser is equal to the admin user's id
        if(likedUser.likes[0].equals(admin._id)){
          console.log("Match!")
  
          let isMatched = true;
  
          // let handlebars know that there's a match, will insert a new template with a popup
          res.render("main", {
            layout: "index",
            data: result,
            likedUser: likedUser,
            isMatched: isMatched
          })
        }

      }else{
        console.log("likedUser does not have likes")

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
