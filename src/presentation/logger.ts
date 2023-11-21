import fs from 'fs';
import morgan from 'morgan';

const Logger = () => {
	if(process.env.NODE_ENV?.toLowerCase() === "development")
	{
		return morgan("combined", {
			stream: fs.createWriteStream("./access.log", {
				flags: "a",
			}),
		})
	}
	return morgan("dev");
}

export default Logger;