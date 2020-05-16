import {
  checkingHitType,
  convertHitTypeToString,
  convertStringToHitType,
  getHitTypeKeyPair,
} from "../../../models/parameters/HitType";

describe("HitType", () => {
  test("checking invalid hit type", () => {
    const is = checkingHitType("test");
    expect(is).toEqual(false);
  });

  test.each([
    ["pageview", true],
    ["screenview", true],
    ["transaction", true],
    ["exception", true],
    ["timing", true],
  ])("checking valid '%s' hit type", (name, result) => {
    const is = checkingHitType(name);

    expect(is).toEqual(result);
  });

  test("converting string to hit type", () => {
    const str = convertStringToHitType("screenview");
    expect(str).toEqual("screenview");

    const str2 = convertStringToHitType("test");
    expect(str2).toBeUndefined();
  });

  test("converting hit type to string", () => {
    const str = convertHitTypeToString("screenview");
    expect(str).toEqual("screenview");
  });

  test("get key pair", () => {
    const obj = getHitTypeKeyPair("pageview");
    expect(obj).toEqual({ t: "pageview" });
  });
});
