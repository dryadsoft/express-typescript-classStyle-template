import { NextFunction, Request, Response } from "express";
import UserV1Service from "../services/UserV1Service";

export class UserV1Controller {
  public static getUserProfileData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = UserV1Service.userProfileData();
      res.send(data).status(200);
    } catch (e) {
      throw e;
    }
  }
}
