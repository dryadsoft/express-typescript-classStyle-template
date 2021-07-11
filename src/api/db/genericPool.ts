import "dotenv/config";
import * as generic_pool from "generic-pool";
import mariadb from "mariadb";

const dbConfig = {
  host: <string>process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  user: <string>process.env.DB_USER,
  password: <string>process.env.DB_PASSWORD,
  database: <string>process.env.DB_DATABASE,
  multipleStatements:
    <string>process.env.DB_MULTIPLESTATEMENTS === "true" ? true : false,
  web_port: <string>process.env.DB_WEB_PORT,
};

class GenericPool {
  public pool: generic_pool.Pool<any>;
  constructor() {
    this.pool = generic_pool.createPool(this.factory(), this.options());
  }

  private factory() {
    return {
      name: "mariadb",
      create: function (): any {
        return mariadb.createConnection(dbConfig);
      },
      destroy: function (client: mariadb.Connection): any {
        client.end();
      },
    };
  }

  private options() {
    return {
      max: 10, // maximum size of the pool
      min: 2, // minimum size of the pool
    };
  }
}

process.on("exit", () => {
  console.log("drain");
});

export default new GenericPool().pool;
