import { from, ElementType } from "./ElementType";

const types = from();

export type Transaction = ElementType<typeof types>;
export const checkingTransaction = (input: string) => {
  return types.includes(input as Transaction);
};
