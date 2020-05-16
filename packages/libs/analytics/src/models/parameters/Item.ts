import { from, ElementType } from "./ElementType";

const types = from("ti", "in", "ip", "iq", "ic", "iv");

export type Item = ElementType<typeof types>;
export const checkingItem = (input: string) => {
  return types.includes(input as Item);
};
