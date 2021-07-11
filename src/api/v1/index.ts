// import * as express from "express";
import express, { Router } from "express";
import user from "./user";

class RouterV1 {
  public router: Router = express.Router();
  constructor() {
    this.router.use("/user", user);
  }
}
export default new RouterV1().router;
