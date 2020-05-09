import { number, multiplyBy } from "../index";

test("deep", () => {
  expect(number).toBe(42);

  expect(multiplyBy(2)).toBe(84);
});
