import dotenv from 'dotenv';
import * as http from 'http';
import { router } from './router.js';
import { internalError } from './utils/errors.js';

const server = http.createServer((req, res) => {
  try {
    router(req, res);
  } catch (err) {
    internalError(res);
  }
});

dotenv.config();

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
