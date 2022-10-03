declare type ConstructorFunction<T = any> = new (...args: any[]) => T;

type Services = {
  [serviceName: string]: unknown;
};

export class Container {
  private services: Services = {};

  private injectedSingletons: Services = {};

  static defaultContainer: Container;

  register<T = any>(serviceName: string, serviceClass: ConstructorFunction<T>) {
    this.services[serviceName] = serviceClass as T;
  }

  setDefaultContainer() {
    // set the static option, bit weird but it works
    // we could make the whole Container static but I like being able to make many and pass to inject.
    Container.defaultContainer = this;
  }

  // TODO: should probably avoid invoking this one.
  invoke<T = any>(serviceName: string, serviceOptions?: object): T {
    return new (this.services[serviceName] as ConstructorFunction<T>)(
      serviceOptions
    );
  }

  invokeOrFetchSingleton<T = any>(serviceName: string): T {
    if (!this.injectedSingletons[serviceName]) {
      this.injectedSingletons[serviceName] = this.invoke(serviceName);
    }
    return this.injectedSingletons[serviceName] as T;
  }

  getServices() {
    return this.services;
  }
}
