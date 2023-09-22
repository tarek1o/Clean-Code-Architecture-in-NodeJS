import {Request, Response, NextFunction} from 'express';
import APIError from './APIError';

abstract class GlobalErrorHandler {
    private static sendErrorForDev = (error: APIError, response: Response) => response.status(error.statusCode).json(error)

    private static sendErrorForProd = (error: APIError, response: Response) => response.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
    })

    static catchError(error: APIError, request: Request, response: Response): void {
        error.status = 'error';
        if(process.env.NODE_ENV === "prodution") {
            GlobalErrorHandler.sendErrorForProd(error, response);
        }
        else {
            GlobalErrorHandler.sendErrorForDev(error, response);
        }
    }
}

export default GlobalErrorHandler;
