import express, { NextFunction, Request, Response } from "express";
import helmet from "helmet";
import logger from "morgan";
import NodeBatis from "node-batis";
import { Routes } from "./api/routes";

class App {
  public app: express.Application;
  public router: Routes = new Routes();
  constructor() {
    this.app = express();
    this.config();
    this.middleware();
    this.errorHandle();
    this.router.routes(this.app);
  }

  private config(): void {
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS,PUT");
      res.header("Access-Control-Allow-Headers", "*");
      next();
    });
  }

  private middleware(): void {
    // this.app.use(cors());
    this.app.use(helmet());
    this.app.use(logger("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));

    const nodeBatis = NodeBatis.getInstance();
    const xmlDbPath = `${__dirname}/api/db/map`;
    nodeBatis.init(xmlDbPath, true);
  }

  private errorHandle(): void {
    this.app.use(function (
      err: any,
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get("env") === "development" ? err : {};

      // render the error page
      res.status(err.status || 500);
      res.render("error");
    });
  }
}
export default new App().app;
