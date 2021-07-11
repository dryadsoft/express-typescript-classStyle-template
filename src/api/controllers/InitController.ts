import { NextFunction, Request, Response } from "express";
import InitService from "../services/InitService";

export class InitController {
  public static getInitData(req: Request, res: Response, next: NextFunction) {
    try {
      const data = InitService.initData();
      res.send(data).status(200);
    } catch (e) {
      throw e;
    }
  }
}
