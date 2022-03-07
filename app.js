const express = require("express");
const app = express();
const port = 3000;

const handlebars = require("express-handlebars");

const hbs = handlebars.create({
  helpers: {
    // cardList: require("./helpers/cardsList")
    cardsList() {
      return "BAR!";
    },
  },
});

// handlebars.registerHelper("listItem", function (from, to, context, options){
//   let item = ""
//   for (var i = from, j = to; i < j; i++) {
//     item = item + options.fn(context[i]);
//   }
//   return item;
// })

const bodyParser = require("body-parser");
// const multer = require("multer");
const db = require("./config/connect.js");
const UserModel = require("./models/user");

app.set("view engine", "hbs");
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

app.use(express.static("public"));

db.connectDb();

// index page

app.get("/", async (req, res) => {
  await UserModel.find({})
    .lean()
    .exec((err, users) => {
      // const userList = users.slice(0, 3);
      console.log(users.length);
      users.length = 3;

      console.log(users)

      res.render("main", {
        layout: "index",
        data: users,
      });
    });
});

// if like has been pressed

app.get("/result-like", async (req, res) => {
  console.log("like");

  await UserModel.find({})
  .lean()
  .exec((err, users) => {
    console.log(users.length);
    users.length = 3;

    users.push(users.shift())

    console.log(users)

  });

});

// if dislike has been pressed

app.get("/result-dislike", async (req, res) => {
  console.log("dislike");
});

// count how many users

UserModel.find()
  .lean()
  .exec((err, results) => {
    console.log(`amount of users is ${results.length}`);
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
  });
});

app.get("*", (req, res) => {
  res.send(`${404} not found`);
});

app.listen(port, () => console.log(`App listening to port ${port}`));

// useful: https://waelyasmina.medium.com/a-guide-into-using-handlebars-with-your-express-js-application-22b944443b65
