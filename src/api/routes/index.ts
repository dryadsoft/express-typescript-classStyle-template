import { Application } from "express";
import { InitController } from "../controllers/InitController";
import v1 from "../v1";
import user from "./user";

export class Routes {
  public routes(app: Application): void {
    app.route("/").get(InitController.getInitData);
    app.use("/user", user);
    // app.route("/user").get(UserController.getUserProfileData);
    app.use("/v1", v1);
  }
}
