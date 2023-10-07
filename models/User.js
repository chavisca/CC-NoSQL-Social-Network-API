const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function(v) {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: "Please enter a valid email"
    },
    required: [true, "Email required"]
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought' }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User' }],
  }, // Add virtual called friendCount to retrieve length of friends array on query
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;
