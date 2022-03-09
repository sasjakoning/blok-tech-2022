const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: [true, "Firstname is required"]
    },
    lastname: {
        type: String,
        required: [true,  "Lastname is required"]
    },
    charactername: {
        type: String,
        required: [true, "Character name is required"]
    },
    aboutme: {
        type: String,
        required: [false]
    },
    lookingfor: {
        type: Array,
        required: [false]
    }
})

const UserModel = mongoose.model("user", UserSchema)

module.exports = UserModel;