import { checkingEvent } from "../../../models/parameters/Event";

describe("Event", () => {
  test.each`
    data    | result
    ${"ed"} | ${false}
    ${"ab"} | ${false}
    ${"pq"} | ${false}
    ${"ql"} | ${false}
  `("checking invalid $data", ({ data, result }) => {
    const res = checkingEvent(data);
    expect(res).toEqual(result);
  });

  test.each`
    data    | result
    ${"ec"} | ${true}
    ${"ea"} | ${true}
    ${"el"} | ${true}
    ${"ev"} | ${true}
  `("checking valid $result", ({ data, result }) => {
    const res = checkingEvent(data);
    expect(res).toEqual(result);
  });
});
