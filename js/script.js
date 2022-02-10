const nodemon = require("nodemon")
const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello wsadsawWorld')
})

app.listen(3000)