import express, { Router } from "express";
import { config } from "config";
import helmet from "helmet";
import cors from "cors";
import { AuthenticationRoutes, MenuRoutes, UsersRoutes } from "routes";
import "@/config/database";
export const bootstrap = (port = config.PORT) => {
  //Instance of express
  const app = express();

  // Include all middlewares
  [
    // Body Parse
    express.json(),
    // Parse application/x-www-form-urlencoded
    express.urlencoded({ extended: true }),
    // Helmet helps you secure your Express apps by setting various HTTP headers.
    helmet(),
    // CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
    cors(),
  ]
    // Add middlewares to express app instance
    .forEach(middleware => app.use(middleware));
  //Include all routes

  const addRoute = (baseApi: string, route: Router) => {
    app.use(`/api/${baseApi}`, route);
  };
  addRoute("menus", MenuRoutes);
  addRoute("auth", AuthenticationRoutes);
  addRoute("users", UsersRoutes);
  //Middlewares to parse the request body
  //body parser, helmet and cors

  const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  return { server, app };
};
