const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getUsernames,getThoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing users
  await User.deleteMany({});

  // Drop existing thoughts
  await Thought.deleteMany({});

  // Create empty array to hold the users and thoughts
  const users = [];
  const usernames = [];
  const thoughts = [];
  // add users to the users array
  for (let i = 0; i < 3; i++) {
    const username = getUsernames(i)
    const email = `${username}${Math.floor(Math.random() * (99 - 18 + 1) + 18)}@gmail.com`;
    const thought = getThoughts(i);
    thoughts.push({getThoughts(i)});

    users.push({
      username,
      email,
      thought,
    });
    usernames.push(username);
  }

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
