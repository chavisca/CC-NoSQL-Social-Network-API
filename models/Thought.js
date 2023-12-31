const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
      default: 'Unnamed reaction',
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

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
      },
    username: {
    type: String,
    required: true,
    },
    reactions: [{ reactionSchema }],
    users: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
}, 
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

reactionSchema.path('createdAt').get(function(createdAt) {
  return createdAt.toISOString();
});

thoughtSchema.path('createdAt').get(function(createdAt) {
  return createdAt.toISOString();
});

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
