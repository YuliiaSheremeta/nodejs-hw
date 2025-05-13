import dotenv from 'dotenv';
dotenv.config();

import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnections.js';

const bootstrap = async ()=> {

  await initMongoConnection();
  setupServer();

};

bootstrap();
