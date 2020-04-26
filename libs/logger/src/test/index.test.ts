import { should } from "@nmsys/dev-cli";
should();

describe("test", () => {
  it("hello", () => {
    const test = 1 + 2;
    test.should.be.equals(3);

    console.log("test");
  });
});
