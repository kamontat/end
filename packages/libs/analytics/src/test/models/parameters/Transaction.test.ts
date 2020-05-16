import { checkingTransaction } from "../../../models/parameters/Transaction";

describe("Transaction", () => {
  test.each`
    data    | result
    ${"ia"} | ${false}
    ${"te"} | ${false}
    ${"td"} | ${false}
    ${"iw"} | ${false}
  `("checking $data should be $result", ({ data, result }) => {
    const res = checkingTransaction(data);
    expect(res).toEqual(result);
  });

  test.each`
    data     | result
    ${"ti"}  | ${true}
    ${"ta"}  | ${true}
    ${"tr"}  | ${true}
    ${"tt"}  | ${true}
    ${"ts"}  | ${true}
    ${"tcc"} | ${true}
  `("checking $data should be $result", ({ data, result }) => {
    const res = checkingTransaction(data);
    expect(res).toEqual(result);
  });
});
