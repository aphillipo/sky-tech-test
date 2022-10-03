import { expect, describe, test, beforeEach } from "@jest/globals";
import { Container } from "./container";
import { injectSingleton } from "./injectSingleton";

import { MockDatabase } from "./__mocks__/MockDatabase";
import { testClassFactory } from "./__mocks__/testClassFactory";

describe("injectSingleton", () => {
  let container: Container;

  beforeEach(() => {
    container = new Container();
    container.register("fakeDatabase", MockDatabase);
  });

  test("should return true when calling connect", async () => {
    const Test = testClassFactory();

    // decorating like this manually
    const decorateWithMockDatabase = injectSingleton(
      ["fakeDatabase"],
      container
    );
    decorateWithMockDatabase(Test);

    // create our test class
    const newTest = new Test();
    const connected = await newTest.join();

    expect(connected).toStrictEqual(true);
  });

  test("should throw when there is no container passed or global container set", () => {
    const Test = testClassFactory();

    expect(() => {
      const decorateWithMockDatabase = injectSingleton(["fakeDatabase"]);
      decorateWithMockDatabase(Test);
    }).toThrowErrorMatchingSnapshot();
  });

  test("setting container to default should avoid throw", async () => {
    const Test = testClassFactory();
    container.setDefaultContainer();

    const decorateWithMockDatabase = injectSingleton(["fakeDatabase"]);
    decorateWithMockDatabase(Test);

    const newTest = new Test();
    // this calls our injected fakeDatabase
    const success = await newTest.signIn("aphillipo", "fake-token");
    expect(success).toBe(true);
  });
});
