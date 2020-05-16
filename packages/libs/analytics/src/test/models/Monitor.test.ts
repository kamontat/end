import { Monitor } from "../../models/Monitor";

describe("Monitor", () => {
  test("can be create", () => {
    const monitor = new Monitor();
    expect(monitor.size).toEqual(0);
  });

  test("receive data", () => {
    const id = "custom";
    const param = { new: "param" };

    const monitor = new Monitor();

    monitor.receiving(id, param);

    const params = monitor.parameters();

    expect(monitor.size).toEqual(1);
    expect(params).toContain({ id, value: param });
  });

  test("data will merge by id", () => {
    const id = "custom";

    const param1 = { new: "param" };
    const param2 = { new2: "param2" };

    const monitor = new Monitor();

    monitor.receiving(id, param1);
    monitor.receiving(id, param2);

    const params = monitor.parameters();
    const param = params.find(v => v.id === id);

    expect(monitor.size).toEqual(1);
    expect(param?.value.new).toEqual("param");
    expect(param?.value.new2).toEqual("param2");
  });

  test("all data will gone when reset it", () => {
    const id1 = "custom1";
    const id2 = "custom2";

    const param1 = { new: "param" };
    const param2 = { new2: "param2" };

    const monitor = new Monitor();

    monitor.receiving(id1, param1);
    monitor.receiving(id2, param2);

    expect(monitor.size).toEqual(2);

    monitor.reset();

    expect(monitor.size).toEqual(0);
  });
});
