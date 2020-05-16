import { Throwable } from "../../src";

describe("Throwable object", () => {
  describe("Creation", () => {
    const t = new Throwable(12, "Name", "message...");

    test("getting code", () => {
      expect(t.code).toEqual(12);
    });

    test("getting name", () => {
      expect(t.name).toEqual("Name");
    });

    test("getting message", () => {
      expect(t.message).toEqual("message...");
    });
  });
});
