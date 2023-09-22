import {Request, Response } from 'express';
import asyncHandler from'express-async-handler';
import HttpStatusCode from '../enums/HTTPStatusCode';
import {ResponseFormatter} from '../responseFormatter/ResponseFormatter';
import { IUserService } from '../../application/interfaces/IServices/IUserService';
import { inject, injectable } from 'inversify';

@injectable()
export class UserController {
    constructor(@inject('IUserService') private userService: IUserService ) {}

    count = asyncHandler(async (request: Request, response: Response) => {
        const count = await this.userService.count({});
        const formattedResponse = ResponseFormatter.formate<{count: number}>(true, `No Users in DB`, [{count}]);
        response.status(HttpStatusCode.OK).json(formattedResponse);
    });
}