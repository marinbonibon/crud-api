import * as Users from '../models/usersModel.js';

export const getUsers = async (_req, res) => {
  try {
    const users = await Users.showUsers();
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(users));
  } catch (err) {
    console.log('err', err);
  }
}
