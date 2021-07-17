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

class DBPool {
  private static pool: Pool;

  static getPool() {
    if (!DBPool.pool) {
      console.log("start pool");
      DBPool.pool = mariadb.createPool({ ...dbConfig, connectionLimit: 10 });
    }
    return DBPool.pool;
  }
}

export default DBPool.getPool();
