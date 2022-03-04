
const express = require("express");
const app = express();
const port = 3000;


const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
// const multer = require("multer");
const db = require("./config/connect.js")
const UserModel = require("./models/user")

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

app.get("/", (req, res) => {
  res.render("main", {
    layout: "index"
  });
});

app.get("/create-user", (req, res) => {
  res.render("createUser", {
    layout: "index"
  })
})

app.post("/api/user", (req, res) => {
  const saveUser = new UserModel(req.body)

  saveUser.save((error, savedUser)=>{
    if(error) throw error
    res.json(savedUser)
    console.log("saveuser")
  })
})

app.get("*", (req, res) => {
  res.send(`${404} not found`);
});

app.listen(port, () => console.log(`App listening to port ${port}`));

// useful: https://waelyasmina.medium.com/a-guide-into-using-handlebars-with-your-express-js-application-22b944443b65
