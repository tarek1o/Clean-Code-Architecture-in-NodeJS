import { Request, Response, NextFunction } from "express";
import asyncHandler from'express-async-handler';
import {AllowedModels, Permissions} from '../types/ModelPermission'
import HttpStatusCode from '../enums/HTTPStatusCode';
import { ResponseFormatter } from "../responseFormatter/ResponseFormatter";

export class ModelPermissionController {
	constructor() {}

	getAllModelPermissions = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
    response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'All models and their permissions are retrieved successfully', [{
      allowedModels: AllowedModels,
      permissions: Permissions
    }]));
	});
}