const express = require("express");
const { redirect } = require("express/lib/response");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("User list");
});

router.get("/new", (req, res) => {
  res.render("users/new")
});

router.post("/", (req, res) => {
  const isValid = false
  if(isValid){
      users.push({ firstname: req.body.firstName })
      res.redirect(`/users/${users.length - 1}`)
  }else {
      console.log("error")
      res.render("users/new", {firstName: req.body.firstName})
  }
});

router
  .route("/:id")
  .get((req, res) => {
    console.log(req.user)
    res.send(`Get user with ID ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Update user with ID ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete user with ID ${req.params.id}`);
});

const users = [{name: "Kees"}, {name: "Harry"}]

router.param("id", (req, res, next, id) => {
    req.user = users[id]
    next()
})

module.exports = router;
