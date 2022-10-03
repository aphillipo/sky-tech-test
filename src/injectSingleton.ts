import { Container } from "./container";

export type InjectSingletonPayload = string[];

export const injectSingleton = (
  injectables: InjectSingletonPayload,
  container?: Container
) => {
  const injectContainer = container || Container.defaultContainer;

  if (!injectContainer) {
    throw new Error(
      "Cannot find container, call setDefaultContainer to set globally or pass into inject"
    );
  }

  return (constructor: Function) => {
    injectables.forEach((serviceName: string) => {
      constructor.prototype[serviceName] =
        injectContainer.invokeOrFetchSingleton(serviceName);
    });
  };
};
