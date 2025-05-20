import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import { getEnvVar } from './utils/getEnvVar.js';
import contactRouter from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';


const PORT = Number(getEnvVar('PORT','3000'));

export const setupServer = async () => {

    const app = express();
    app.use(express.json());
    app.use(cors());



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

    app.use(contactRouter);

    app.use(notFoundHandler);
    app.use(errorHandler);


    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
