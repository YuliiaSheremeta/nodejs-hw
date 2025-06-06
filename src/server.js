import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';


const PORT = Number(getEnvVar('PORT','3000'));

export const setupServer = async () => {

    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(cookieParser());



    app.use(
        pinoHttp({
            transport: {
                target: 'pino-pretty',
                options: {
                    colorize: true,
                }
            },
        }),
    );

    app.use(router);

    app.use(notFoundHandler);
    app.use(errorHandler);


    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
