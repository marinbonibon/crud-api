import dotenv from 'dotenv';
import * as http from 'http';
import { getUsers } from './src/controllers/usersController.js';


const server = http.createServer((req, res) => {
 if (req.url === '/api/users' && req.method === 'GET') {
   getUsers(req, res).then(r => r);
 } else {
   res.writeHead(404, {'Content-Type': 'application/json'});
   res.end(JSON.stringify({ message: 'Route not found' }));
 }
});

dotenv.config();

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
