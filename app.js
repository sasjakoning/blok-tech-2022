const express = require("express");
const app = express();
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

const handlebars = require("express-handlebars");

const bodyParser = require("body-parser");
// const multer = require("multer");
const db = require("./config/connect.js");
const UserModel = require("./models/user");
const AdminUserModel = require("./models/adminUser");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const toId = mongoose.Types.ObjectId;

app.use(bodyParser.urlencoded({ extended: false }));

app.engine(
  "hbs",
  handlebars.engine({
    layoutsDir: __dirname + "/views/layouts",
    extname: "hbs",
    defaultLayout: "planB",
    partialsDir: __dirname + "/views/partials/",
  })
);

app.set("view engine", "hbs");

app.use(express.static("public"));

db.connectDb();

// get all users from database etc
const getUsers = async () => {
  // find the admin user (which is being used as "logged in user" for demo purposes)
  const admin = await AdminUserModel.findOne({ username: "adminuser" });

  // find which users admin has matched
  const adminMatches = admin.matches;

  // return all users exept the already matched ones
  const usersList = await UserModel.find({
    _id: { $nin: adminMatches },
  }).lean();

  return [usersList, admin];
};

// to count the amount of times the page has been visited by the user. this to serve the correct object from array
let counter1 = 0;
let counter2 = 2;

/**************/
/* index page */
/**************/

app.get("/", async (req, res) => {
  try {
    counter1 = 0;
    counter2 = 2;
    // for demo purposes, counter is always reset when on start page

    // get users
    getUsers().then(([result, admin]) => {
      ///////////////////////////////////////////////////////////////////////

      // code to remove matches from admin database (demo purposes)

      // AdminUserModel.updateMany(
      //   {name: "admin"},
      //   {$set: {matches: []}},
      //   (err, affected) => {
      //     console.log("affected", affected)
      //   }
      // )

      ///////////////////////////////////////////////////////////////////////

      console.log(`counter1 is ${counter1}`);
      console.log(`counter2 is ${counter2}`);

      // only return two users from the array
      result = result.slice(counter1, counter2);

      // send result to handlebars
      res.render("main", {
        layout: "index",
        data: result,
      });
    });
  } catch (err) {
    console.log(err);
  }
});

/****************************/
/* if like has been pressed */
/****************************/

app.post("/like/:id", async (req, res) => {
  console.log("like");

  try {
    // turns id into ObjectId instead of a string with number
    req.params.id = toId(req.params.id);

    // find the user that's been liked
    const likedUser = await UserModel.findById(req.params.id).lean();

    // put all users in variable to check length
    const userCount = await UserModel.find({}).lean();

    // find users
    getUsers().then(([result, admin]) => {
      // add to the counter everytime "like" is pressed aka: link is visited
      console.log("Adding to counter");
      counter1++;
      counter2++;

      console.log(`counter1 is ${counter1}`);
      console.log(`counter2 is ${counter2}`);

      // only send 2 users
      result = result.slice(counter1, counter2);

      console.log(userCount.length);

      // if the counter goes beyond the amount of users in array, reset back to original
      if (counter2 == userCount.length) {
        counter1 = 0;
        counter2 = 2;
      }

      // add likeduser to likes array of admin (Not included in this feature)
      // admin.likes.push(likedUser)
      // admin.save();

      // check if the liked user has own likes as well
      if (likedUser.likes[0]) {
        // if true, check if the like in the likedUser is equal to the admin user's id
        if (likedUser.likes[0].equals(admin._id)) {
          console.log("Match!");

          let isMatched = true;

          // fix for database update which offsets the array
          console.log("pulling from counter");
          counter1--;
          counter2--;

          if (admin.matches.includes(likedUser._id)) {
            console.log("admin matches includes the id of liked user");
          } else {
            console.log("admin matches does not yet include this liked user");

            console.log("adding liked user to database");

            admin.matches.push(likedUser);
            admin.save();
          }

          // let handlebars know that there's a match, will insert a new template with a popup
          res.render("main", {
            layout: "index",
            data: result,
            likedUser: likedUser,
            isMatched: isMatched,
          });
        }
      } else {
        console.log("likedUser does not have likes");

        res.render("main", {
          layout: "index",
          data: result,
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

/*******************************/
/* if dislike has been pressed */
/*******************************/

app.post("/dislike/:id", async (req, res) => {
  console.log("dislike");

  try {
    // turns id into ObjectId instead of a string with number
    req.params.id = toId(req.params.id);

    // find the user that's been liked
    const disLikedUser = await UserModel.findById(req.params.id).lean();

    // put all users in variable to check length
    const userCount = await UserModel.find({}).lean();

    // find users
    getUsers().then(([result, admin]) => {
      // add to the counter everytime "dislike" is pressed aka: link is visited
      counter1++;
      counter2++;

      console.log(`counter1 is ${counter1}`);
      console.log(`counter2 is ${counter2}`);

      // only send 2 users
      result = result.slice(counter1, counter2);

      console.log(userCount.length);

      // if the counter goes beyond the amount of users in array, reset back to original
      if (counter2 == userCount.length) {
        counter1 = 0;
        counter2 = 2;
      }

      // add likeduser to likes array of admin (Not included in this feature)
      // admin.dislikes.push(likedUser)
      // admin.save();

      res.render("main", {
        layout: "index",
        data: result,
      });
    });
  } catch (err) {
    console.log(err);
  }
});

/****************/
/* view matches */
/****************/

app.get("/matches", async (req, res) => {
  const admin = await AdminUserModel.findOne({}).populate("matches").lean();

  const adminMatches = admin.matches;

  console.log(admin.matches);

  res.render("matches", {
    layout: "index",
    data: adminMatches,
  });
});

/****************/
/* delete match */
/****************/

app.post("/matches/:id", async (req, res) => {
  // turns id into ObjectId instead of a string with number
  req.params.id = toId(req.params.id);

  // find the user that's been liked
  const deletedUser = await UserModel.findById(req.params.id).lean();

  console.log("deleted user is");
  console.log(deletedUser);

  AdminUserModel.updateMany(
    { name: "admin" },
    { $pull: { matches: deletedUser._id } },
    (err, affected) => {
      console.log("affected", affected);
    }
  );

  const admin = await AdminUserModel.findOne({}).populate("matches").lean();

  const adminMatches = admin.matches;

  res.redirect("/matches");
});

/**************************************************/
/* create new users to add to database (dev tool) */
/**************************************************/

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

/******************************************************/
/* reset matches for adminuser in database (dev tool) */
/******************************************************/

app.get("/reset", async (req, res) => {
  try {

    AdminUserModel.updateMany(
      { name: "admin" },
      { $set: { matches: [] } },
      (err, affected) => {
        console.log("affected", affected);
      }
    );

    res.render("reset", {
      layout: "index"
    });
    
  } catch (err) {
    console.log(err);
  }
});

/********************************************/
/* incase user lands on a non existant page */
/********************************************/

app.get("*", (req, res) => {
  res.send(`${404} not found`);
});

// server

app.listen(process.env.PORT || 5000, () => console.log(`App listening to port ${port}`));

// useful: https://waelyasmina.medium.com/a-guide-into-using-handlebars-with-your-express-js-application-22b944443b65
