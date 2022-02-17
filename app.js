const express = require("express");
const app = express();
const port = 3000;

const handlebars = require("express-handlebars");

app.set("view engine", "hbs");

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
      name: 'Katarina',
      realName: 'midlaner'
    },
    {
      name: 'Jayce',
      realName: 'toplaner'
    },
    {
      name: 'Heimerdinger',
      realName: 'toplaner'
    },
    {
      name: 'Zed',
      realName: 'midlaner'
    },
    {
      name: 'Azir',
      realName: 'midlaner'
    }
  ];
}

app.get("/", (req, res) => {
  res.render("main", { layout: "index", users: users()});
});

app.get("*", (req, res) => {
  res.send(`${404} not found`);
});

app.listen(port, () => console.log(`App listening to port ${port}`));

// useful: https://waelyasmina.medium.com/a-guide-into-using-handlebars-with-your-express-js-application-22b944443b65
