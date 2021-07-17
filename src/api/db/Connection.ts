import { Pool } from "mariadb";
import DBPool from "./DBPool";
// import DBPool from "./DBPool";

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

class Connection {
  private pool: Pool | null = null;
  private conn: any;

  constructor() {
    this.pool = DBPool;
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
      console.log(e);
      throw e;
    }
  }
}

export default new Connection();
