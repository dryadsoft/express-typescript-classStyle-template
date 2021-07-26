import "dotenv/config";
import generic_pool from "generic-pool";
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

class DBPool {
  private static pool: mariadb.Pool;

  static getPool() {
    if (!DBPool.pool) {
      console.log("start pool");
      DBPool.pool = mariadb.createPool({ ...dbConfig, connectionLimit: 10 });
      // `${__dirname}/map`
    }
    return DBPool.pool;
  }
}

class DBPool2 {
  private static pool: generic_pool.Pool<mariadb.Connection>;

  public static getPool() {
    if (!DBPool2.pool) {
      console.log("start pool");
      DBPool2.pool = generic_pool.createPool(
        DBPool2.factory(),
        DBPool2.options()
      );
    }
    return DBPool2.pool;
  }

  private static factory() {
    return {
      create: (): Promise<mariadb.Connection> => {
        return mariadb.createConnection(dbConfig);
      },
      destroy: function (client: mariadb.Connection): any {
        client.end();
      },
    };
  }

  private static options() {
    return {
      min: 5,
      max: 10,
    };
  }
}

export default DBPool.getPool();
