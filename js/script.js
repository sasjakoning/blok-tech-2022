const express = require("express")

const app = express();
const port = 3000;

app.set("view engine", "ejs")
app.use(logger)
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static("public"))


const userRouter = require("../routes/users")

app.use("/users", userRouter)

function logger(req, res, next) {
    console.log(req.originalUrl)
    next()
}

app.listen(port, () => console.log("listening on port" + port))


// GET(how you get info), PUT(how you change info), POST(how you add info), DELETE(how you delete info)

// app.get("/"= is the main path, (req(request), res(repsonse) = callback)

// app.get("/", (req, res)=>{
//   // send things back
//   res.send("Hello world")
// })

// dit om de html te laden
// app.use(express.static("./"))

// app.route("/about")
// .get((req, res) =>{
//   res.send("./about")
// })
// .post((req, res) =>{});

// 404 error
// res.status(404).send("404 not found")

// helpful
// https://www.youtube.com/watch?v=SccSCuHhOw0