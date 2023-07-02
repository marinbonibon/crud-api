import dotenv from 'dotenv';
import * as http from 'http';
import { getUsers, getSingleUser } from './src/controllers/usersController.js';
import { userIdRegExp } from './src/utils/uuidValidation.js';

const mainRoute = '/api/users';

const server = http.createServer((req, res) => {
  if (req.url === mainRoute && req.method === 'GET') {
    getUsers(req, res).then(r => r);
  } else if (req.url.match(userIdRegExp) && req.method === 'GET') {
    const id = req.url.split('/').pop();
    getSingleUser(req, res, id).then(r => r);
  } else if (req.url.includes(mainRoute) && req.method === 'GET' && !req.url.match(userIdRegExp)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid data in request' }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

dotenv.config();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
