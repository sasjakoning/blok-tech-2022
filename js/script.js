const express = require("express")

const app = express();
const port = 3000;

// GET(how you get info), PUT(how you change info), POST(how you add info), DELETE(how you delete info)

// app.get("/"= is the main path, (req(request), res(repsonse) = callback)

// app.get("/", (req, res)=>{
//   // send things back
//   res.send("Hello world")
// })

app.use(express.static("./"))

app.listen(port, () => console.log("listening on port" + port))

// app.route("/about")
// .get((req, res) =>{
//   res.send("./about")
// })
// .post((req, res) =>{});