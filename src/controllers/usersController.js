import * as Users from '../models/usersModel.js';
import { isValidRequestBody } from '../utils/requestBodyValidation.js';

export const getUsers = async (_req, res) => {
  try {
    const users = await Users.showUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(users));
  } catch (err) {
    console.log('err', err);
  }
};

export const getSingleUser = async (_req, res, id) => {
  try {
    const user = await Users.showSingleUser(id);
    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
    } else {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    }
  } catch (err) {
    console.log('err', err);
  }
};

export const createUser = async (req, res) => {
  try {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', async () => {
      const { username, age, hobbies } = JSON.parse(body);
      const isValidUser = isValidRequestBody(username, age, hobbies);
      if (!isValidUser) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Invalid data in request' }));
        return;
      }

      const user = {
        username,
        age,
        hobbies
      };
      const newUser = await Users.create(user);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    });
  } catch (err) {
    console.log('err', err);
  }
};
