import getPool, { TPool } from "./GenericPool";

const waiting = (miliseconds: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, miliseconds);
  });
};

class Connection {
  private pool: TPool = null;
  private conn: any;

  public async getQuery(query: string) {
    try {
      this.pool = getPool;
      this.conn = await this.pool.acquire(1);
      console.log(
        "ready",
        this.pool.size,
        this.pool.available,
        this.pool.borrowed,
        this.pool.pending
      );
      const rows = await this.conn.query(query);
      console.log(
        "ing",
        this.pool.size,
        this.pool.available,
        this.pool.borrowed,
        this.pool.pending
      );

      await waiting(5000);
      await this.release(this.pool, this.conn);
      //   await this.pool.drain();
      //   await this.pool.clear();
      console.log(
        "end",
        this.pool.size,
        this.pool.available,
        this.pool.borrowed,
        this.pool.pending
      );

      return rows;
    } catch (e) {
      await this.destory();
      throw e;
    }
  }

  private async release(Pool: TPool, Conn: any) {
    if (Pool && Conn) {
      await Pool.release(Conn);
      // await Pool.drain();
      // await Pool.clear();
    }
  }
  private async destory() {
    if (this.pool && this.conn) {
      await this.pool.release(this.conn);
      //   await this.pool.drain();
      //   await this.pool.clear();
    }
  }
}

export default new Connection();
