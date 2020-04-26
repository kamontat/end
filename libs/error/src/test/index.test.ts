import Throwable from "../models/throwable";
import ThrowState, { ThrowStateType } from "../models/state";
import ErrorManager from "../models/manager";
import { should } from "@nd/dev-testbox";

should();
describe("Error manager", () => {
  it("run normal result manager", () => {
    const hello = (): string => {
      throw Throwable.build(ThrowState(ThrowStateType.WARN, 1, "Hello"), "this is a exception from hello function");
    };

    const world = () => {
      return "hello world";
    };

    const manager = new ErrorManager();

    const helloResult = manager.run(hello);
    const worldResult = manager.run(world);

    helloResult?.should.be.undefined;
    worldResult?.should.be.equal("hello world");
  });
});
