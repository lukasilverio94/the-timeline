import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valida email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Minimum password length is 6 characters"],
  },
});

//Fire a function after doc saved to database
// userSchema.post("save", function(doc, next) {
//     console.log("new user was crreated and saved", doc);
//     next()
// })

const User = mongoose.model("user", userSchema);

export default User;
