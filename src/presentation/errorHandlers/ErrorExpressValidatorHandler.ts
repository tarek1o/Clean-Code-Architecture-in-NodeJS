import {Request, Response, NextFunction} from 'express';
import { validationResult } from 'express-validator/src/validation-result';
import GlobalErrorMiddleware from "./GlobalErrorHandler"
import APIError  from "./APIError";
import HttpStatusCode from '../enums/HTTPStatusCode';

abstract class ExpressErrorValidator {
	static catchExpressValidatorErrors (request: Request, response: Response, next: NextFunction) {
		const errors = validationResult(request);
		if (!errors.isEmpty()) {
			const errorMessage = errors.array()[0].msg;
			GlobalErrorMiddleware.catchError(new APIError(errorMessage, HttpStatusCode.BadRequest), request, response, next);        
			return;
		}
		next();
	}
}

export default ExpressErrorValidator