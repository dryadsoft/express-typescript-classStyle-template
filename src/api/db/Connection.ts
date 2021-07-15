import getPool, { TPool } from "./GenericPool";

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
  private pool: TPool = null;
  private conn: any;

  constructor() {
    this.pool = getPool;
  }
  public async getQuery(query: string) {
    try {
      if (this.pool) {
        this.conn = this.pool.acquire();
        await asyncLog(
          "start",
          this.pool.size,
          this.pool.available,
          this.pool.borrowed,
          this.pool.pending
        );

        await waiting(1000);
        this.conn
          .then((client: any) => {
            return client.query(query, [], () => {
              // return object back to pool
              this.pool?.release(client);
            });
          })
          .then((rows: any) => {
            console.log(rows);
          })
          .catch((err: any) => {
            console.log(err);
          });
        // const rows = await this.conn.query(query, [], () => {
        //   this.pool?.release(this.conn);
        // });

        // await this.release();
        await asyncLog(
          "end",
          this.pool.size,
          this.pool.available,
          this.pool.borrowed,
          this.pool.pending
        );

        // return rows;
      }
    } catch (e) {
      await this.release();
      throw e;
    }
  }

  private async release() {
    if (this.pool && this.conn) {
      try {
        await this.pool.release(this.conn);
      } catch (err) {
        console.log(err);
      }
      // await Pool.drain();
      // await Pool.clear();
    }
  }
}

export default new Connection();
