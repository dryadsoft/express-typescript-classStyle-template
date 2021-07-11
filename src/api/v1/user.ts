import express, { Router } from "express";
import { UserV1Controller } from "../controllers/UserV1Controller";

class User {
  public router: Router = express.Router();
  constructor() {
    this.router.get("/", UserV1Controller.getUserProfileData);
    this.router.get("/profile", UserV1Controller.getUserProfileData);
  }
}
export default new User().router;
