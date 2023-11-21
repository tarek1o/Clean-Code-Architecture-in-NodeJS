import { Response, NextFunction, request } from "express";
import asyncHandler from "express-async-handler";
import {inject, injectable} from "inversify";
import { ExtendedRequest } from "../../types/ExtendedRequest";
import APIError from "../../errorHandlers/APIError";
import {IUserService} from "../../../application/interfaces/IServices/IUserService";
import { AllowedModel, AllowedModels } from "../../types/ModelPermission";
import HttpStatusCode from "../../enums/HTTPStatusCode";
import { MainRoles } from "../../types/MainRoles";
import { JWTGenerator } from "../../services/JWTGenerator";

@injectable()
export class Authorization { 

  constructor(@inject('IUserService') private userService: IUserService) {}

  private isCurrentUserRoleInList = (request: ExtendedRequest, roleList: MainRoles[]): boolean => {
    if(request?.user?.role && roleList.includes(request.user.role.slug as MainRoles)) {
      return true
    }
    return false;
  }

  isAuthenticated = asyncHandler(async (request: ExtendedRequest, response: Response, next: NextFunction) => { 
    if(request.headers.authorization && request.headers.authorization.startsWith("Bearer")) {
      const token = request.headers.authorization.split(" ")[1];
      const decodedPayload = JWTGenerator.verifyAccessToken(token);
      const user = await this.userService.findFirst({
        where: {
          email: {equals: decodedPayload?.email, mode: 'insensitive'}
        },
        include: {
          role: true
        }
      });

      if(user) {
        if(user?.passwordUpdatedTime) {
          const passwordUpdatedTimeInSeconds = parseInt(`${user.passwordUpdatedTime.getTime() / 1000}`, 10);
          if(passwordUpdatedTimeInSeconds > decodedPayload.iat) {
            throw new APIError("Unauthorized, try to login again", HttpStatusCode.Unauthorized);
          }
        }
        if(user.isBlocked || user.isDeleted) {
          throw new APIError('Your are blocked, try to contact with our support team', HttpStatusCode.Forbidden);
        }
        request.user = user;
        next();
        return;
      }
    }
    throw new APIError("Unauthorized, try to login again", HttpStatusCode.Unauthorized);
  });
  
  isAuthorized = (modelName: AllowedModel) => asyncHandler(async (request: ExtendedRequest, response: Response, next: NextFunction) => { 
    let permission = request.method.toLowerCase();
    if(request.user?.role?.allowedModels) {
      for(const allowedModel of request.user?.role.allowedModels) {
        if(allowedModel.modelName.toLowerCase() === modelName.toLowerCase() && allowedModel.permissions.includes(permission)) {
          next();
          return;
        }
      }
    }

    permission = (permission === 'post') ? 'add' : (permission === 'patch') ? 'update' : permission;

    throw new APIError(`Not Allowed to ${permission} ${modelName}`, HttpStatusCode.Unauthorized);
  });
  
  isCurrentUserRoleInWhiteList = (...roleWhiteList: MainRoles[]) => asyncHandler(async (request: ExtendedRequest, response: Response, next: NextFunction) => { 
    if(this.isCurrentUserRoleInList(request, roleWhiteList)) {
      next();
    }
    else {
      throw new APIError('Not allow to access this route', HttpStatusCode.Unauthorized);
    }
  });

  isCurrentUserRoleInBlackList = (...roleBlackList: MainRoles[]) => asyncHandler(async (request: ExtendedRequest, response: Response, next: NextFunction) => { 
    if(this.isCurrentUserRoleInList(request, roleBlackList)) {
      throw new APIError('Not allow to access this route', HttpStatusCode.Unauthorized);
    }
    else {
      next();
    }
  });
  
  isParamIdEqualCurrentUserId = (userId = 'id') => asyncHandler(async (request: ExtendedRequest, response: Response, next: NextFunction) => { 
    if(request.user && +request.params[userId] !== request.user.id && this.isCurrentUserRoleInList(request, ['instructor', 'student'])) {
      throw new APIError('Not allow to access this route, the Id in route not match the Id of the current user', HttpStatusCode.Unauthorized);
    }
    next();
  });
  
  restrictedUpdateForAdminOnly = (restrictedProperties: string[]) => asyncHandler(async (request: ExtendedRequest, response: Response, next: NextFunction) => {
    if(request.user?.role?.slug === AllowedModels.Instructors || request.user?.role?.slug === AllowedModels.Students) {
      for(const property of restrictedProperties) {
        delete request.body.input[property];
      }
    };
    next();
  })
}

