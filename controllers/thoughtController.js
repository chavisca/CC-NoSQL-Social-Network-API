const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const { thoughtText, username } = req.body;
      const user = await User.findOne ({ username });

      if (!user) {
        return res.status(404).json({ message: 'No user with that username' });
      }

      const thought = await Thought.create({ thoughtText, username });

      user.thoughts.push(thought._id);
      await user.save();

      res.json({ message: 'Thought created and added to user', thought });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thoughtId = req.params.thoughtId;
      const thought = await Thought.findOne({ _id: thoughtId });

      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      }
      
      const username = thought.username;
      const user = await User.findOne({ username });

      if (user) {
        const thoughtIndex = user.thoughts.indexOf(thought._id);
        if (thoughtIndex === -1) {
          user.thoughts.splice(thoughtIndex, 1);
          await user.save();
        }
      }

      await thought.delete();

      res.json({ message: 'Thought and User references deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      const { thoughtId } = req.params;
      const { username, thoughtText } = req.body;
      const thought = await Thought.findbyId(thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' })
      }

      if (username) {
        thought.username = username;
      }

      if (thoughtText) {
        thought.thoughtText = thoughtText;
      }

      const updatedThought = await thought.save();

      res.json({ message: 'Thought successfully updated', thought: updatedThought });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  async addReaction(req, res) {
    try {
      const thoughtId = req.params.thoughtId;
      const reactionData = req.body;

      const thought = await Thought.findById(thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      thought.reactions.push(reactionData);
      await thought.save();

      res.json({ message: 'Reaction added successfully', thought });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  async removeReaction(req, res) {
    try {
      const thoughtId = req.params.thoughtId;
      const reactionId = req.params.reactionId;

      const thought = await Thought.findById(thoughtId);

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      const reactionIndex = thought.reactions.findIndex((reaction) => reaction._id.toString() === reactionId);

      thought.reactions.splice(reactionIndex, 1);
      await thought.save();

      res.json({ message: 'Reaction removed successfully', thought });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  }

};
