import { should } from "@nmsys/dev-testbox";
import { isTesting, isDevelopment, isProduction } from "..";

should();
describe("Environment helper", () => {
  it("checking testing", () => {
    process.env.NODE_ENV = "test";

    isTesting().should.be.true;
    isDevelopment().should.be.false;
  });

  it("checking development", () => {
    process.env.NODE_ENV = "d";

    isDevelopment().should.be.true;
    isProduction().should.be.false;
  });

  it("checking production", () => {
    process.env.NODE_ENV = "production";

    isProduction().should.be.true;
    isTesting().should.be.false;
  });
});
