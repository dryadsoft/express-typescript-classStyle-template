import express, { Router } from "express";
import { ProfileController } from "../controllers/ProfileController";
import { UserController } from "../controllers/UserController";

class User {
  public router: Router = express.Router();
  constructor() {
    this.router.get("/", UserController.getUserProfileData);
    this.router.get("/profile", ProfileController.getUserProfileData);
  }
}
export default new User().router;
