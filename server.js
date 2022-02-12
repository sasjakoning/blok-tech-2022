if(process.env.NODE_ENV !== "production") {
    require("dotenv").config()
}

const express = require("express")
const app = express()
const bcrypt = require("bcrypt")
const passport = require("passport")
const flash = require("express-flash")
const session = require("express-session")

const initializePassport = require("./passport-config")
const { process_params } = require("express/lib/router")
initializePassport(
    passport, 
    email => users.find(user => user.email === email)
)

const users = []

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: false}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.get("/", (req, res) => {
    res.render("index.ejs")
})

// LOGIN
app.get("/login", passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true
}))

app.post("/login", (req, res) => {
    
})

// REGISTER
app.get("/register", (req, res) => {
    res.render("register.ejs")
})

app.post("/register", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect("/login")
    }catch {
        res.redirect("/register")
    }
})

app.listen(3000)


// https://www.youtube.com/watch?v=-RCnNyD0L-s