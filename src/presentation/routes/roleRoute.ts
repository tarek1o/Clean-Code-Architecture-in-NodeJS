import express from 'express';
import container from '../dependencyInjection/DI'
import {idValidation} from "../middlewares/express-validator/idValidation";
import {Authorization} from '../middlewares/authorization-validator/AuthorizationValidator';
import {addRoleValidation, updateRoleValidation, deleteRoleValidation} from "../middlewares/express-validator/roleValidator"
import {RoleController} from '../controllers/RoleController';

const {isAuthenticated, isAuthorized} = container.get<Authorization>('Authorization');
const {getAllRoles, getRoleById, createRole, updateRole, deleteRole} = container.get<RoleController>('RoleController');

const roleRouter = express.Router();

roleRouter.route("/")
	.get(isAuthenticated, isAuthorized('Role'), getAllRoles)
	.post(isAuthenticated, isAuthorized('Role'), addRoleValidation, createRole)

roleRouter.route("/:id")
	.get(idValidation, isAuthenticated, isAuthorized('Role'), getRoleById)
	.patch(idValidation, isAuthenticated, isAuthorized('Role'), updateRoleValidation, updateRole)
	.delete(idValidation, isAuthenticated, isAuthorized('Role'), deleteRoleValidation, deleteRole)

export default roleRouter;