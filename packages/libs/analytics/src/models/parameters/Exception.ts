import { from, ElementType } from "./ElementType";

const types = from("exd", "exf");

export type Exception = ElementType<typeof types>;
export const checkingException = (input: string) => {
  return types.includes(input as Exception);
};
