import { checkingTiming } from "../../../models/parameters/Timing";

describe("Timing", () => {
  test.each`
    data       | result
    ${"utcs"}  | ${false}
    ${"cuts"}  | ${false}
    ${"autc"}  | ${false}
    ${"u t c"} | ${false}
    ${"u tc"}  | ${false}
    ${"de"}    | ${false}
    ${"aa"}    | ${false}
  `("checking $data should be $result", ({ data, result }) => {
    const res = checkingTiming(data);
    expect(res).toEqual(result);
  });

  test.each`
    data     | result
    ${"utc"} | ${true}
    ${"utv"} | ${true}
    ${"utt"} | ${true}
    ${"utl"} | ${true}
    ${"dns"} | ${true}
    ${"plt"} | ${true}
    ${"pdt"} | ${true}
    ${"rrt"} | ${true}
    ${"tcp"} | ${true}
    ${"srt"} | ${true}
    ${"dit"} | ${true}
    ${"clt"} | ${true}
  `("checking $data should be $result", ({ data, result }) => {
    const res = checkingTiming(data);
    expect(res).toEqual(result);
  });
});
