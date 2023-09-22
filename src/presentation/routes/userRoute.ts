import express from 'express';
import {UserController} from '../controllers/UserController';
import container from '../dependancyInjection/DI'

const userController = container.get<UserController>('UserController');

const userRouter = express.Router();

userRouter.route("/")
    .get(userController.count)

export default userRouter;
