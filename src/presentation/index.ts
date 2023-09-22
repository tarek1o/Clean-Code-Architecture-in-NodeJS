import express from "express"
import cors from 'cors';
import compression from 'compression';
import CreateServer from "./config/CreateServer";
import Logger from "./logger";
import notFoundRoutes from "./errorHandlers/NotFoundRoutesHandler";
import GlobalError from "./errorHandlers/GlobalErrorHandler"
import userRoutes from "./routes/userRoute"
import UnhandledRejection from "./errorHandlers/UnhandledRejectionHandler";

const app = express();

const server = CreateServer.create(app);

app.use(Logger());
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(compression());

app.use("/api/v1/users", userRoutes);

app.all('*', notFoundRoutes.catchRoute);

app.use(GlobalError.catchError);

UnhandledRejection.catchError(server);