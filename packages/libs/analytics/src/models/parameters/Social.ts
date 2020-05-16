import { from, ElementType } from "./ElementType";

const types = from("sn", "sa", "st");

export type Social = ElementType<typeof types>;
export const checkingSocial = (input: string) => {
  return types.includes(input as Social);
};
