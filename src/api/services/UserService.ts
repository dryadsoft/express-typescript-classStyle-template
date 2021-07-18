import Connection from "../db/Connection";
import NodeBatis from "../db/NodeBatis";
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
      // let rows;
      // for (let i = 0; i < 100; i++) {
      //   rows = await Connection.getQuery("select BASC_YY from TB_BASC_TERM");
      // }
      // return rows;
      const param = {
        param: 1,
      };
      const query = await NodeBatis.getSelectStatement({
        mapFile: "user",
        id: "select_test2",
        param,
      });

      const rows = await Connection.getQuery(query);
      return rows;
    } catch (err) {
      // console.log(err);
      return JSON.stringify(err);
    }
  }
}
export default new UserService();
