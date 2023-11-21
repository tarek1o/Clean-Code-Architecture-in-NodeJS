import {NextFunction, Request, Response} from 'express';
import APIError from './APIError';
import HttpStatusCode from '../enums/HTTPStatusCode';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';

abstract class GlobalErrorHandler {
	private static sendErrorForDev = (error: APIError, response: Response) => response.status(error.statusCode).json({
		status: error.status,
		name: error.name,
		message: error.message,
		stack: error.stack,
	});

	private static sendErrorForProd = (error: APIError, response: Response) => response.status(error.statusCode).json({
		status: error.status,
		message: error.message,
	});

	static catchError(error: APIError, request: Request, response: Response, next: NextFunction): void {
		error.status = 'Error';
		if(!error.statusCode) {
			error.statusCode = HttpStatusCode.InternalServerError;
		}

		// if(error instanceof PrismaClientValidationError) {
		// 	const errorMessage = error.message.split('\n');
		// 	error.message = errorMessage[errorMessage.length - 1].split('?')[0];
		// 	error.statusCode = HttpStatusCode.BadRequest;
		// }

		if(process.env.NODE_ENV?.toLowerCase() === "development") {
			GlobalErrorHandler.sendErrorForDev(error, response);
		}
		else {
			GlobalErrorHandler.sendErrorForProd(error, response);
		}
	};
}

export default GlobalErrorHandler;
