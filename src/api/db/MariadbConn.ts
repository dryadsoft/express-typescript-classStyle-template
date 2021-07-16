import { Pool } from "mariadb";
import getPool from "./MariadbPool";
const waiting = (miliseconds: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, miliseconds);
  });
};

const asyncLog = (...args: any) => {
  return new Promise((resolve) => {
    console.log(args);
    resolve("");
  });
};

class MariadbConn {
  private pool: Pool | null = null;
  private conn: any;

  constructor() {
    this.pool = getPool;
  }
  public async getQuery(query: string) {
    try {
      if (this.pool) {
        this.conn = await this.pool.getConnection();

        const rows = await this.conn.query(query);
        // await asyncLog("connected ! connection id is " + this.conn.threadId);
        // await waiting(1000);
        await this.conn.release(); //release to pool

        await asyncLog(
          "connection status =>",
          this.pool.totalConnections(),
          this.pool.activeConnections(),
          this.pool.idleConnections()
        );

        return rows;
      }
    } catch (e) {
      throw e;
    }
  }
}

export default new MariadbConn();
