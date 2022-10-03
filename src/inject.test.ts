import { expect, describe, test, beforeEach } from "@jest/globals";
import { Container } from "./container";
import { inject } from "./inject";

import { MockDatabase } from "./__mocks__/MockDatabase";
import { testClassFactory } from "./__mocks__/testClassFactory";

describe("inject", () => {
  let container: Container;

  beforeEach(() => {
    container = new Container();
    container.register("fakeDatabase", MockDatabase);
  });

  test("should return true when calling connect", async () => {
    const Test = testClassFactory();

    // decorating like this manually
    const decorateWithMockDatabase = inject({ fakeDatabase: null }, container);
    decorateWithMockDatabase(Test);

    // create our test class
    const newTest = new Test();
    const connected = await newTest.join();

    expect(connected).toStrictEqual(true);
  });

  test("should throw when there is no container passed or global container set", () => {
    const Test = testClassFactory();

    expect(() => {
      const decorateWithMockDatabase = inject({ fakeDatabase: null });
      decorateWithMockDatabase(Test);
    }).toThrowErrorMatchingSnapshot();
  });

  test("setting container to default should avoid throw", async () => {
    const Test = testClassFactory();
    container.setDefaultContainer();

    const decorateWithMockDatabase = inject({ fakeDatabase: null });
    decorateWithMockDatabase(Test);

    const newTest = new Test();
    // this calls our injected fakeDatabase
    const success = await newTest.signIn("aphillipo", "fake-token");
    expect(success).toBe(true);
  });

  test("our service is called with injected options", async () => {
    const Test = testClassFactory();
    container.setDefaultContainer();

    // pass some params to new MockDatabase()
    const decorateWithMockDatabase = inject({ fakeDatabase: { test: 1 } });
    decorateWithMockDatabase(Test);

    // initialise the decorated test class
    const test = new Test();

    // maybe there is a nicer way to do this?
    expect(
      (test.fakeDatabase as MockDatabase).constructorMock
    ).toHaveBeenCalledWith({ test: 1 });
  });
});
