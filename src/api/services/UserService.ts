// import NodeBatis from "node-batis";

import NodeBatis from "node-batis";
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
      // let rows;
      // for (let i = 0; i < 100; i++) {
      //   const param = {
      //     param: 1,
      //   };
      //   const query = await NodeBatis.getStatement({
      //     mapFile: "user",
      //     id: "select_test2",
      //     param,
      //   });
      //   rows = await Connection.getQuery(query);
      // }
      // return rows;
      const param = {
        param: 1,
      };

      const nodeBatis = NodeBatis.getInstance();

      const query = await nodeBatis.getStatement({
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
