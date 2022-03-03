
const express = require("express");
const app = express();
const port = 3000;

const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const multer = require("multer");

app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));

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

users = () => {
  return [
    {
      name: "Katarina",
      realName: "Katy Johnson",
    },
    {
      name: "Gollum",
      realName: "Rick Smith",
    },
    {
      name: "Deathbringer",
      realName: "Eric Paul",
    },
    {
      name: "Butterfy Lily",
      realName: "Sarah Burger",
    },
    {
      name: "Azir",
      realName: "Micheal Beach",
    },
    {
      name: "Azir",
      realName: "Micheal Beach",
    },
    {
      name: "Azir",
      realName: "Micheal Beach",
    },
  ];
};

app.get("/", (req, res) => {
  res.render("main", {
    layout: "index",
    users: users(),
  });
});

// test voor de buttons like dislike
app.get("/register", (req, res) => {
  const email = req.body.email;

  res.send("worked");

  const data = {
    email,
  };
});

app.get("*", (req, res) => {
  res.send(`${404} not found`);
});

app.listen(port, () => console.log(`App listening to port ${port}`));

// useful: https://waelyasmina.medium.com/a-guide-into-using-handlebars-with-your-express-js-application-22b944443b65
