import { createUser, getSingleUser, getUsers, updateUser } from "./controllers/usersController.js";
import { userIdRegExp } from './utils/uuidValidation.js';

const mainRoute = '/api/users';

export const router = (req, res) => {
  if (req.url === mainRoute && req.method === 'GET') {
    getUsers(req, res).then(r => r);
  } else if (req.url.match(userIdRegExp) && req.method === 'GET') {
    const id = req.url.split('/').pop();
    getSingleUser(req, res, id).then(r => r);
  } else if (req.url === mainRoute && req.method === 'POST') {
    createUser(req, res).then(r => r);
  } else if (req.url.match(userIdRegExp) && req.method === 'PUT') {
    const id = req.url.split('/').pop();
    updateUser(req, res, id).then(r => r);
  } else if (req.url.includes(mainRoute) && req.method === 'GET' && !req.url.match(userIdRegExp)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid data in request' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
}
