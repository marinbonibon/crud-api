import { createUser, deleteUser, getSingleUser, getUsers, updateUser } from "./controllers/usersController.js";
import { userIdRegExp } from './utils/uuidValidation.js';

const mainRoute = '/api/users';

export const router = async (req, res) => {
  if (req.url === mainRoute && req.method === 'GET') {
    await getUsers(req, res);
  } else if (req.url.match(userIdRegExp) && req.method === 'GET') {
    const id = req.url.split('/').pop();
    await getSingleUser(req, res, id);
  } else if (req.url === mainRoute && req.method === 'POST') {
    await createUser(req, res);
  } else if (req.url.match(userIdRegExp) && req.method === 'PUT') {
    const id = req.url.split('/').pop();
    await updateUser(req, res, id);
  } else if (req.url.match(userIdRegExp) && req.method === 'DELETE') {
    const id = req.url.split('/').pop();
    await deleteUser(req, res, id);
  } else if (req.url.includes(mainRoute) && req.method === 'GET' && !req.url.match(userIdRegExp)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid data in request' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
}
