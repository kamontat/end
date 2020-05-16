import { checkingItem } from "../../../models/parameters/Item";

describe("Item", () => {
  test.each`
    data    | result
    ${"ia"} | ${false}
    ${"ta"} | ${false}
    ${"td"} | ${false}
    ${"iw"} | ${false}
  `("checking invalid $data", ({ data, result }) => {
    const res = checkingItem(data);
    expect(res).toEqual(result);
  });

  test.each`
    data    | result
    ${"sn"} | ${true}
    ${"in"} | ${true}
    ${"ip"} | ${true}
    ${"iq"} | ${true}
    ${"ic"} | ${true}
    ${"iv"} | ${true}
  `("checking valid $result", ({ data, result }) => {
    const res = checkingItem(data);
    expect(res).toEqual(result);
  });
});
