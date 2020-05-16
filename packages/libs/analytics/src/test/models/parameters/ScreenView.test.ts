import { checkingScreenView } from "../../../models/parameters/ScreenView";

describe("ScreenView", () => {
  test.each`
    data    | result
    ${"fa"} | ${false}
    ${"ba"} | ${false}
    ${"dw"} | ${false}
    ${"we"} | ${false}
  `("checking invalid $data", ({ data, result }) => {
    const res = checkingScreenView(data);
    expect(res).toEqual(result);
  });

  test.each`
    data      | result
    ${"an"}   | ${true}
    ${"av"}   | ${true}
    ${"aid"}  | ${true}
    ${"aiid"} | ${true}
    ${"cd"}   | ${true}
  `("checking valid $result", ({ data, result }) => {
    const res = checkingScreenView(data);
    expect(res).toEqual(result);
  });
});
