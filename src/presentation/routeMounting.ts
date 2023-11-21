import { Application } from 'express';
import userRoutes from "./routes/userRoute"
import roleRoutes from "./routes/roleRoute"
import authenticationRoutes from "./routes/authenticationRoute"
import modelPermissionRoutes from "./routes/modelPermissionRoute"

export const routeMounting = (app: Application) => {
  app.use(`${process.env.apiVersion}/auth`, authenticationRoutes);
  app.use(`${process.env.apiVersion}/users`, userRoutes);
  app.use(`${process.env.apiVersion}/roles`, roleRoutes);
  app.use(`${process.env.apiVersion}/permissions`, modelPermissionRoutes);
}