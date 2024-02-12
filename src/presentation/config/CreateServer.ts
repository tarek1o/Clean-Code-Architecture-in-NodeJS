import { Application } from 'express';
import prisma from '../../domain/db';

abstract class CreateServer {
	private static PORT = process.env.PORT || 8080;
	static create = (app: Application) => app.listen(this.PORT, async() => {
		await prisma.$connect();	
		console.log(`App is running at: http://localhost:${this.PORT} 🚀`);
	})
}

export default CreateServer;