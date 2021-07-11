interface IUserData {
  name: string;
  id: number;
}
interface IUserService {
  userProfileData(): IUserData;
}

class UserV1Service implements IUserService {
  public userProfileData(): IUserData {
    try {
      return {
        name: "Rishabh",
        id: 1820,
      };
    } catch (e) {
      throw e;
    }
  }
}
export default new UserV1Service();
