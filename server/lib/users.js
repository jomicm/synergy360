/* eslint-disable no-await-in-loop */
const randUser = require('./randUser');

const users = {};

// Random ID until the ID is not in use
async function randomID() {
  let id = randUser();
  while (id in users) {
    await Promise.delay(5);
    id = randUser();
  }
  return id;
}

exports.create = async (socket, id) => {
  // const id = await randomID();
  users[id] = socket;
  console.log('users', Object.keys(users));
  return id;
};

exports.get = id => users[id];

exports.remove = id => delete users[id];
