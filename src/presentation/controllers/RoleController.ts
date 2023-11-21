import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import asyncHandler from'express-async-handler';
import HttpStatusCode from '../enums/HTTPStatusCode';
import {IRoleService} from "../../application/interfaces/IServices/IRoleService"
import { ResponseFormatter } from "../responseFormatter/ResponseFormatter";
import APIError from "../errorHandlers/APIError";
import { RequestManager } from "../services/RequestManager";

@injectable()
export class RoleController {

	constructor(@inject('IRoleService') private roleService: IRoleService ) {}

	getAllRoles = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
		const findOptions = RequestManager.findOptionsWrapper(request);
		const promiseResult = await Promise.all([
			this.roleService.findMany(findOptions),
			this.roleService.count({where: findOptions.where})
		]);
		response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'All roles are retrieved successfully', promiseResult[0], promiseResult[1], findOptions.skip, findOptions.take));
	});

	getRoleById = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const role = await this.roleService.findUnique({
			where: {
				id: +request.params.id,
			},
			select,
			include
		});
		if(!role) {
			throw new APIError('This role does not exist', HttpStatusCode.BadRequest);
		}
		response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'The role is retrieved successfully', [role]));
	});

	createRole = asyncHandler(async(request: Request, response: Response, next: NextFunction) => {
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const createdRole = await this.roleService.create({
			data: request.body.input,
			select,
			include,
		});
		response.status(HttpStatusCode.Created).json(ResponseFormatter.formate(true, 'The role is created successfully', [createdRole]));
	});

	updateRole = asyncHandler(async(request: Request, response: Response, next: NextFunction) => {
		const {select, include} = RequestManager.findOptionsWrapper(request);
		const updatedRole = await this.roleService.update({
			where: {
				id: +request.params.id
			},
			data: request.body.input,
			select,
			include,
		});
		response.status(HttpStatusCode.OK).json(ResponseFormatter.formate(true, 'The role is updated successfully', [updatedRole]));
	});

	deleteRole = asyncHandler(async (request: Request, response: Response, next: NextFunction) => {
		await this.roleService.delete(+request.params.id);
		response.status(HttpStatusCode.NoContent).json();
	});
}