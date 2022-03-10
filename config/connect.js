require("dotenv").config();

const mongoose = require("mongoose");
const url = process.env.ATLAS_URI;

const connectDb = async () => {

    try {
        await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})

        // let db = client.db('mytestingdb');

        // db.collection("users")

        console.log("db connection succesful")
    } catch (err) {
        console.log(`faiiled to connect: ${err}`)
        throw err
    }
}

module.exports = {
    connectDb
}

