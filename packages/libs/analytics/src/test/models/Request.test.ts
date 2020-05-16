import { Request } from "../../models/Request";

describe("Request", () => {
  test("create new Request object", () => {
    const req = new Request("", "", "", "", {});
    expect(req).toBeDefined();
  });

  test("get request id", () => {
    const id = "custom-id";

    const req = new Request(id, "", "", "", {});
    expect(req.id).toEqual(id);
  });

  test("get request id", () => {
    const id = "custom-id";
    const version = "1";
    const tid = "UA-123";

    const req = new Request(id, version, tid, "", { custom: "param" });

    expect(req.body).toContain(`v=${version}`);
    expect(req.body).toContain(`tid=${tid}`);

    expect(req.body).toContain(`custom=param`);
  });
});
