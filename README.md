Hello there!

This is the IoC container interview question for SKY.

To get started type: `yarn` and to run the tests `yarn test`.

## Example

```typescript
class ServiceClass {
  call() {
    console.log("this is a test");
  }
}

const container = new Container();
container.register("service", ServiceClass);

// ... later
@inject({ service: { options: "etc." } }, container)
class TestServiceInjection {
  service!: ServiceClass;

  testServiceClass() {
    this.service.call();
  }
}
```

## Interview Requirements

- The steps you take to make the library great to use

When writing a library instead of writing code for the library I always write and example of how I want the code to work. For example most IoC libaries inject their payload into the constructor as parameters while I prefer here automatically injecting values into the prototype of the object. I also looked at what feels like lots of other libraries doing IoC and dependancy injection but did not really love any of them.

- How you set up the code for further collaborative development

.gitignore, scrips in package.json, jest setup, tsconfig. Would probably like to add prettier and es/tslint but that is obviously an omission. I've given an example.

In reality I think a whole load of things should happen such as CI, stopping master commits, more examples, and more flexibility.

- Your approach to testing

I have tried to make sure I'm testing with 100% coverage. I did do some TDD here but to get the interface I wanted I needed to fiddle with the tests quite a bit after the event. I did make an example too that I haven't committed to design the software up front.

- How you deal with feature gaps and edge cases

I think this is a fairly good start but there is definitely more to do such as @injectFunction, @injectClassVariable, probably a few other things like indeed circular dependancies would be tricky. I would really like to make the types a bit cleverer too I'm certain it's possible to infer more things automatically and avoid the use of `any`.
