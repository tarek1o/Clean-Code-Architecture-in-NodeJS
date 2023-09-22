import express from 'express';
import {RoleController} from '../controllers/RoleController';

// const roleController = new RoleController();

const roleRouter = express.Router();

roleRouter.route("/")
    .get()
    .post()

roleRouter.route("/:id")
    .get()
    .patch()
    .delete()

export default roleRouter;
