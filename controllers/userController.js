const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();

      const userObj = {
        users
      };

      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const userId = req.params.userId;
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      res.json({
        user
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and remove their thoughts
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndRemove({ _id: req.params.userId });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      const thoughtsDeleted = await Thought.deleteMany(
        { users: req.params.userId }
      );

      if (!thoughtsDeleted) {
        return res.status(404).json({
          message: 'User deleted, but no thoughts found',
        });
      }

      res.json({ message: 'User and associated thoughts successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const { userId } = req.params;
      const { username, email } = req.body;
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      if (username) {
        user.username = username;
      }

      if (email) {
        user.email = email;
      }

      const updatedUser = await user.save();

      res.json({ message: 'User successfully updated', user: updatedUser });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  async addFriend(req, res) {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }
      
      if (!user.friends) {
        user.friends = [];
      }

      const friend = await User.findById(friendId);

      if (!friend) {
        return res.status(404).json({ message: 'No friend with that ID' })
      }

      user.friends.push(friendId);
      await user.save();

      res.json({ message: 'Friend added successfully', user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  async removeFriend(req, res) {
    try {
      const userId = req.params.userId;
      const friendId = req.params.friendId;

      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }
      
      if (!user.friends) {
        user.friends = [];
      }

      const friendIndex = user.friends.indexOf(friendId);

      if (friendIndex === -1) {
        return res.status(404).json({ message: 'Friend not found in user\'s friend list' })
      }

      user.friends.splice(friendIndex, 1);
      await user.save();

      res.json({ message: 'Friend removed successfully', user });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
