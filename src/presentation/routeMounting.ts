import { Application } from 'express';
import userRoutes from "./routes/userRoute"
import roleRoutes from "./routes/roleRoute"
import authenticationRoutes from "./routes/authenticationRoute"
import modelPermissionRoutes from "./routes/modelPermissionRoute"

export const routeMounting = (app: Application) => {
  const apiVersion = process.env.API_Version;
  app.use(`${apiVersion}/auth`, authenticationRoutes);
  app.use(`${apiVersion}/users`, userRoutes);
  app.use(`${apiVersion}/roles`, roleRoutes);
  app.use(`${apiVersion}/permissions`, modelPermissionRoutes);
}