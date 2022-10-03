import { Container } from "./container";

export type Injectable<T = unknown> = T;

export type InjectPayload = {
  [key: string]: unknown;
};

export const inject = (injectables: InjectPayload, container?: Container) => {
  const injectContainer = container || Container.defaultContainer;

  if (!injectContainer) {
    throw new Error(
      "Cannot find container, call setDefaultContainer to set globally or pass into inject"
    );
  }

  return (constructor: Function) => {
    Object.entries(injectables).forEach(([serviceName, serviceOptions]) => {
      constructor.prototype[serviceName] = injectContainer.invoke(
        serviceName,
        // TODO: spend some time figuring out how to infer this in TS
        serviceOptions as object
      );
    });
  };
};
