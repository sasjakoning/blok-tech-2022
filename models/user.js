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
    },
    likes: [{type: mongoose.Types.ObjectId, ref: "adminuser"}],
    dislikes: [{type: mongoose.Types.ObjectId, ref: "adminuser"}]
})

const UserModel = mongoose.model("user", UserSchema)

// manually add users

// const user = UserModel.insertMany([
//     {
//         firstname: "Sasja",
//         lastname: "Koning",
//         charactername: "Amber",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis"
//     },
//     {
//         firstname: "Griffin",
//         lastname: "Rollins",
//         charactername: "Dillon",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis"
//     },
//     {
//         firstname: "Valentin",
//         lastname: "Tanner",
//         charactername: "Alexia",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis"
//     },
//     {
//         firstname: "Noah",
//         lastname: "Powell",
//         charactername: "Brennen",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis"
//     },
//     {
//         firstname: "Roy",
//         lastname: "Yu",
//         charactername: "Chance",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis"
//     },
//     {
//         firstname: "Alfred",
//         lastname: "Munoz",
//         charactername: "Melvin",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis"
//     },
//     {
//         firstname: "Augustus",
//         lastname: "Gilbert",
//         charactername: "Allison",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis"
//     },
//     {
//         firstname: "Keith",
//         lastname: "Goodwin",
//         charactername: "Elian",
//         aboutme: "magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis"
//     }
// ])


module.exports = UserModel;