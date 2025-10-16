import express from 'express';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import router from './routes/index.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import { logger } from './middleware/logger.js';
import { errors } from 'celebrate';


const PORT = Number(getEnvVar('PORT','3000'));

export const setupServer = () => {

    const app = express();

  app.use(logger);

  app.use(express.json());

  app.use(cors({
  origin: getEnvVar('CLIENT_ORIGIN', 'http://localhost:3000'),
  credentials: true,
}));
  app.use(cookieParser());

  app.use(router);

  app.use(notFoundHandler);

  app.use(errors());

  app.use(errorHandler);


    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
