const connection = require('../config/connection');
const { Thought, User } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing users
  await User.deleteMany({});

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Create empty array to hold the users and thoughts
  const users = [
    {
      username: 'lijingshier',
      email: 'lijing900913@gmail.com',
    },
    {
      username: 'jackielee',
      email: 'jackielee@gmail.com',
    },
    {
      username: 'fanwang',
      email: 'fanwang86@gmail.com',
    },
  ]

  const thoughts = [
    {
      text: 'This is awesome!',
      username: 'lijingshier',
    },
    {
      text: 'I love it!',
      username: 'jackielee',
    },
    {
      text: 'Could you tell us more about it?',
      username: 'fanwang',
    },
  ]

  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // Add thoughts to the collection and await the results
  await Thought.collection.insertMany(thoughts);

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
