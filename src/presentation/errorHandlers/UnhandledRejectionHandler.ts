import * as http from 'http';
import prisma from '../../domain/db'

abstract class UnhandledRejectionHandler {
	static catchError = (server: http.Server) => process.on('unhandledRejection', async(error) => {
		console.error(`Unhandled Rejection Errors: ${error}`);
		await prisma.$disconnect();
		server.close(() => {
			console.error('Shutting down....');
			process.exit(1);
		});
	})
}

export default UnhandledRejectionHandler;
