import GenericPool, { TPool } from "../db/GenericPool";
interface IUserData {
  name: string;
  id: number;
}
interface IUserService {
  userProfileData(): Promise<any>;
}

class UserService implements IUserService {
  public async userProfileData(): Promise<any> {
    let pool: TPool = null;
    let db: any;
    try {
      pool = GenericPool;
      db = await pool.acquire();
      // console.log(db);
      const result = await db.query("select BASC_YY from TB_BASC_TERM");
      const { rows, meta } = await db.query("select * from TB_DUE_MNG");
      console.log(rows);
      pool.release(db);
      // console.log(result);
      return result;
    } catch (e) {
      if (pool && db) {
        pool.release(db);
      }
      throw e;
    }
  }
}
export default new UserService();
