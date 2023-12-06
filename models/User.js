import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter an username"],
  },
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please enter a valide email"],
  },
  password: {
    type: String,
    validate: {
      validator: function (value) {
        return value.length > 0;
      },
      message: "Please enter a password",
    },
    minlength: [6, "Minimum password length is 6 characters"],
  },
});

// // Fire a function after doc saved to database
// userSchema.post("save", function (doc, next) {
//   console.log("new user was created and saved", doc);
//   next();
// });

// //Fire function before doc saved to database
// //HASH PASSWORD
// userSchema.pre("save", async function (next) {
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

const User = mongoose.model("user", userSchema);

export default User;
