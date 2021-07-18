import { Pool } from "mariadb";
import { asyncLog } from "../../utils";
import DBPool from "./DBPool";

class Connection {
  private pool: Pool;
  private conn: any;

  constructor() {
    this.pool = DBPool;
  }
  public async getQuery(query: string) {
    try {
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
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}

// class Connection2 {
//   private pool: generic_pool.Pool<mariadb.Connection> | null = null;
//   private conn: any;

//   constructor() {
//     this.pool = DBPool;
//   }
//   public async getQuery(query: string) {
//     try {
//       if (this.pool) {
//         this.conn = await this.pool.acquire();

//         const rows = await this.conn.query(query);
//         await this.pool.release(this.conn); //release to pool
//         await asyncLog(
//           "connection status =>",
//           this.pool.size,
//           this.pool.available,
//           this.pool.borrowed,
//           this.pool.pending
//         );

//         return rows;
//       }
//     } catch (e) {
//       console.log(e);
//       throw e;
//     }
//   }
// }

export default new Connection();
