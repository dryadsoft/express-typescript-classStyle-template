import { NextFunction, Request, Response } from "express";
import ProfileService from "../services/ProfileService";

export class ProfileController {
  public static async getUserProfileData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const data = await ProfileService.userProfileData();
      res.send(data).status(200);
    } catch (e) {
      throw e;
    }
  }
}
