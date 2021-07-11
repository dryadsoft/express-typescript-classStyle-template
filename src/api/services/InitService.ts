class InitService {
  public initData() {
    try {
      return `This is Class Type Express Server!!`;
    } catch (e) {
      throw e;
    }
  }
}
export default new InitService();
