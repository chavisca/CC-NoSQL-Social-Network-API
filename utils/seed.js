const connection = require('../config/connection');
const { User, Thought } = require('../models');
const getRandomSet = require('./data');

console.log(getRandomSet());
connection.on('error', (err) => err);

connection.once('open', async () => {
  // Delete the collections if they exist
  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }

  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }

  const users = [];

  for (let i = 0; i < 20; i++) {
    const userLoad = getRandomSet();
    const username = userLoad.split(' ')[0];
    const email = userLoad.split(' ')[1];

    users.push({
      username,
      email,
    });
  }

  await User.collection.insertMany(users);
  console.log(users);
  process.exit(0);
});
