import dotenv from 'dotenv';
import http, { IncomingMessage, ServerResponse } from 'http';
import { router } from './router';
import { internalError } from './utils/errors';

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    try {
      router(req, res);
    } catch (err) {
      internalError(res);
    }
  },
);

dotenv.config();

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
