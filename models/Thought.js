const { Schema, model } = require('mongoose');

// Schema to create a Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // add getter method to format timestamp on query
      },
    username: {
    type: String,
    required: true,
    },
    reactions: [{ reactionSchema }],
}, //Add virtual called reactionCount to retrieve length of reactions array
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

const Thought = model('thought', thoughtSchema);

module.exports = Thought;