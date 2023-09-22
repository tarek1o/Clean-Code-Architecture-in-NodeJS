import express from 'express';
import {UserController} from '../controllers/UserController';
import container from '../dependancyInjection/DI'

const userController = container.get<UserController>('UserController');

const userRouter = express.Router();

userRouter.route("/")
    .get(userController.count)
    .post()

userRouter.route("/:id")
    .get()
    .patch()
    .delete()

userRouter.route("/block/:id")
    .patch()

export default userRouter;
