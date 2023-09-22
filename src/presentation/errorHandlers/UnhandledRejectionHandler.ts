import * as http from 'http';
import db from '../../domain/db'

abstract class UnhandledRejectionHandler {
    static catchError = (server: http.Server) => process.on("unhandledRejection", async(error) => {
        console.error(`Unhandled Rejection Errors: ${error}`);
        await db.$disconnect();
        server.close(() => {
            console.error(`Shutting down....`);
            process.exit(1);
        })
    })
}

export default UnhandledRejectionHandler;
