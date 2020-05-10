
import { isTesting, isDevelopment, isProduction } from "..";

describe("Environment helper", () => {
  it("checking testing", () => {
    process.env.NODE_ENV = "test";

    expect(isTesting()).toBeTruthy()
    expect(isDevelopment()).toBeFalsy();
  });

  it("checking development", () => {
    process.env.NODE_ENV = "d";

    expect(isDevelopment()).toBeTruthy()
    expect(isProduction()).toBeFalsy();
  });

  it("checking production", () => {
    process.env.NODE_ENV = "production";

    expect(isProduction()).toBeTruthy()
    expect(isTesting()).toBeFalsy();
  });
});
