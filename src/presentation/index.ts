import express from "express"
import cors from 'cors';
import compression from 'compression';
import CreateServer from "./config/CreateServer";
import Logger from "./logger";
import notFoundRoutes from "./errorHandlers/NotFoundRoutesHandler";
import GlobalError from "./errorHandlers/GlobalErrorHandler"
import UnhandledRejection from "./errorHandlers/UnhandledRejectionHandler";
import { routeMounting } from "./routeMounting";
import { upsertMainItemsIntoDB } from "../infrastructure/config/upsertMainItemsIntoDB";

const app = express();

const server = CreateServer.create(app);
app.use(cors());
app.options('*', cors());
app.use(express.json({limit: "50kb"}));
app.use(Logger());
app.use(compression());

// upsertMainItemsIntoDB();

routeMounting(app);

app.all('*', notFoundRoutes.catchRoute);

app.use(GlobalError.catchError)

UnhandledRejection.catchError(server);