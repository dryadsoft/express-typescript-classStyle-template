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
      this.pool = getPool.getPool();
      this.conn = await this.pool.acquire();
      console.log(
        this.pool.size,
        this.pool.available,
        this.pool.borrowed,
        this.pool.pending
      );
      const rows = await this.conn.query(query);
      await waiting(5000);
      await this.release();
      //   await this.pool.drain();
      //   await this.pool.clear();
      console.log(
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

  private async release() {
    if (this.pool && this.conn) {
      await this.pool.release(this.conn);
      //   await this.pool.drain();
      //   await this.pool.clear();
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
