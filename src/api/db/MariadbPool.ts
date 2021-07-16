import "dotenv/config";
import mariadb, { Pool } from "mariadb";

const dbConfig = {
  host: <string>process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "3306"),
  user: <string>process.env.DB_USER,
  password: <string>process.env.DB_PASSWORD,
  database: <string>process.env.DB_DATABASE,
  multipleStatements:
    <string>process.env.DB_MULTIPLESTATEMENTS === "true" ? true : false,
};

class MariadbPool {
  public pool: Pool | null = null;

  constructor() {}

  getPool() {
    if (!this.pool) {
      console.log("create");
      // this.pool = generic_pool.createPool(this.factory(), this.options());
      this.pool = mariadb.createPool({ ...dbConfig, connectionLimit: 10 });
      return this.pool;
    }
    console.log("already");
    return this.pool;
  }
}

process.on("exit", () => {
  console.log("drain");
});

export default new MariadbPool().getPool();
