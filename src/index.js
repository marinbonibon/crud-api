import dotenv from 'dotenv';
import * as http from 'http';
import { router } from "./router.js";

const server = http.createServer((req, res) => {
  try {
    router(req, res);
  } catch (err) {
    console.log('err', err);
  }
});

dotenv.config();

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
