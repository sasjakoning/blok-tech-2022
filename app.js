const express = require("express")
const app = express()

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.send("Hello world")
})

app.get("/about", (req, res) => {
    res.send("About me")
})

app.get("*", (req, res) => {
    res.send(`${404} not found`)
} )

app.listen(3000)