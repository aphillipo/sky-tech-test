import { expect, describe, test, beforeEach } from "@jest/globals";
import { Container } from "./container";

class TestService {
  constructor(...args: any[]) {}
}

describe("container", () => {
  test("is should be possible to register services", () => {
    const container = new Container();
    container.register("testService", TestService);

    expect(container.getServices()).toStrictEqual({ testService: TestService });
  });

  test("is should be possible to set Default Container", () => {
    const container = new Container();
    container.register("testService", TestService);
    container.setDefaultContainer();
    expect(Container.defaultContainer).toStrictEqual(container);
  });

  test("invoke returns an instance of the registered class", () => {
    const container = new Container();
    container.register("testService", TestService);

    expect(container.invoke("testService").constructor).toStrictEqual(
      TestService
    );
  });

  test("invokeOrFetchSingleton return the same reference to service every time", () => {
    const container = new Container();
    container.register("testService", TestService);

    const instance1 = container.invokeOrFetchSingleton("testService");
    const instance2 = container.invokeOrFetchSingleton("testService");

    expect(instance1).toStrictEqual(instance2);
  });
});
