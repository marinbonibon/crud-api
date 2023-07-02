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

export const getSingleUser = async (_req, res, id) => {
  try {
    const user = await Users.showSingleUser(id);
    if (!user) {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.end(JSON.stringify(user));
    }
  } catch (err) {
    console.log('err', err);
  }
}
