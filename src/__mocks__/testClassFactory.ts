import { Database } from "./Database";

export const testClassFactory = () => {
  class Test {
    // tell typescript the database will be filled in, wish this was possible without !
    fakeDatabase!: Database;

    async join() {
      return this.fakeDatabase.connect({});
    }

    async signIn(username: string, token: string) {
      // add user
      await this.fakeDatabase.query("UPDATE user SET user.name = ?", [
        username,
      ]);
      return true;
    }
  }
  return Test;
};
