const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AdminUserSchema = new Schema({
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
    username: {
        type: String
    },
    aboutme: {
        type: String,
        required: [false]
    },
    lookingfor: {
        type: Array,
        required: [false]
    },
    likes: [{type: mongoose.Types.ObjectId, ref: "user"}],
    dislikes: [{type: mongoose.Types.ObjectId, ref: "user"}]
})

const AdminUserModel = mongoose.model("adminuser", AdminUserSchema)


// const admin = new AdminUserModel({
//     firstname: "Admin",
//     lastname: "User",
//     charactername: "god",
//     username: "adminuser",
//     aboutme: "nothing to see here."
// })

// admin.save((err, doc) => {
//     console.log(doc._id)
// })

module.exports = AdminUserModel;

// https://www.youtube.com/watch?v=kjKR0q8EBKE&t=177s  