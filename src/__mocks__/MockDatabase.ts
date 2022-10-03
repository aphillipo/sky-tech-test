import { Database, DatabaseResult } from "./database";

export class MockDatabase implements Database {
  public constructorMock = jest.fn();

  constructor(...args: any[]) {
    this.constructorMock(...args);
  }

  connect = jest.fn((_params: any) => {
    return Promise.resolve(true);
  });

  query = jest.fn(() => {
    const newDbResult: DatabaseResult<any> = {
      results: [],
    };
    return Promise.resolve(newDbResult);
  });
}
