import { Application } from 'express';

abstract class CreateServer {
	private static PORT = process.env.PORT || 8080;
	static create = (app: Application) => app.listen(this.PORT, async() => {
		console.log(`App is running at: ${process.env.baseURL}:${this.PORT} 🚀`);
	})
}

export default CreateServer;