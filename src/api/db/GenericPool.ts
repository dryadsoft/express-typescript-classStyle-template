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
};

export type TPool = generic_pool.Pool<any> | null;

class GenericPool {
  public pool: TPool = null;

  constructor() {}

  getPool() {
    if (!this.pool) {
      console.log("create");
      this.pool = generic_pool.createPool(this.factory(), this.options());
      return this.pool;
    }
    console.log("already");
    return this.pool;
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
      min: 4, // minimum size of the pool
    };
  }
}

process.on("exit", () => {
  console.log("drain");
});

export default new GenericPool().getPool();
