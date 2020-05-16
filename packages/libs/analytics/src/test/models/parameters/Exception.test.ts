import { checkingException } from "../../../models/parameters/Exception";

describe("Exception", () => {
  test.each`
    data    | result
    ${"ad"} | ${false}
    ${"cd"} | ${false}
    ${"wd"} | ${false}
    ${"wa"} | ${false}
  `("checking invalid $data", ({ data, result }) => {
    const res = checkingException(data);
    expect(res).toEqual(result);
  });

  test.each`
    data     | result
    ${"exd"} | ${true}
    ${"exf"} | ${true}
  `("checking valid $result", ({ data, result }) => {
    const res = checkingException(data);
    expect(res).toEqual(result);
  });
});
