const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: { type: String, required: [true, "Username is required"], unique: true },
    email: { type: String, required: [true, 'Email is required.'], unique: true, lowercase: true, trim: true },
    password: { type: String, required: [true, 'Password is required.'] },
    image: String
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
