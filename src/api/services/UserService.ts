import Connection from "../db/Connection";
interface IUserData {
  name: string;
  id: number;
}
interface IUserService {
  userProfileData(): Promise<any>;
}

class UserService implements IUserService {
  public async userProfileData(): Promise<any> {
    try {
      const rows = await Connection.getQuery(
        "select BASC_YY from TB_BASC_TERM"
      );
      return rows;
    } catch (err) {
      console.log(err);
      return JSON.stringify(err);
    }
  }
}
export default new UserService();
