import dotenv from 'dotenv';
dotenv.config();

import { setupServer } from './server.js';
import { initMongoConnection } from './db/connectMongoDB.js';

const bootstrap = async ()=> {

  await initMongoConnection();
  setupServer();

};

bootstrap();
