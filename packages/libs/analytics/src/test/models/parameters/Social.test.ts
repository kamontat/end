import { checkingSocial } from "../../../models/parameters/Social";

describe("Social", () => {
  test.each`
    data        | result
    ${"ss"}     | ${false}
    ${"sw"}     | ${false}
    ${"hel"}    | ${false}
    ${"s n"}    | ${false}
    ${"s t a"}  | ${false}
    ${"sna"}    | ${false}
    ${"asdfst"} | ${false}
  `("checking $data should be $result", ({ data, result }) => {
    const res = checkingSocial(data);
    expect(res).toEqual(result);
  });

  test.each`
    data    | result
    ${"sn"} | ${true}
    ${"sa"} | ${true}
    ${"st"} | ${true}
  `("checking $data should be $result", ({ data, result }) => {
    const res = checkingSocial(data);
    expect(res).toEqual(result);
  });
});
