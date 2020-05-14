import { method, url } from "../ga";

describe("GA Constants", () => {
  test("default method should be POST", () => expect(method).toBe("POST"));

  test("default url should be google analytics", () => expect(url).toContain("google-analytics"));
});
